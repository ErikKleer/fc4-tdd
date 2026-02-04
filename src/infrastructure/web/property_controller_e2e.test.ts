import express from "express";
import request from "supertest";
import { DataSource } from "typeorm";
import { TypeORMPropertyRepository } from "../repositories/typeorm_property_repository";
import { PropertyService } from "../../application/services/property_service";
import { PropertyEntity } from "../persistence/entities/property_entity";
import { BookingEntity } from "../persistence/entities/booking_entity";
import { UserEntity } from "../persistence/entities/user_entity";
import { PropertyController } from "./property_controller";

const app = express();
app.use(express.json());

let dataSource: DataSource;
let propertyRepository: TypeORMPropertyRepository;
let propertyService: PropertyService;
let propertyController: PropertyController;

beforeAll(async () => {
    dataSource = new DataSource({
        type: "sqlite",
        database: ":memory:",
        dropSchema: true,
        entities: [BookingEntity, PropertyEntity, UserEntity],
        synchronize: true,
        logging: false,
    });

    await dataSource.initialize();

    propertyRepository = new TypeORMPropertyRepository(
        dataSource.getRepository(PropertyEntity)
    );

    propertyService = new PropertyService(propertyRepository);
    propertyController = new PropertyController(propertyService);

    app.post("/properties", (req, res, next) => {
        propertyController.createProperty(req, res).catch((err) => next(err));
    });
});

afterAll(async () => {
    await dataSource.destroy();
});

describe("PropertyController", () => {
    beforeEach(async () => {
        const repo = dataSource.getRepository(PropertyEntity);
        await repo.clear();
    });

    it("deve criar uma propriedade com sucesso", async () => {
        const response = await request(app).post("/properties").send({
            id: "1",
            name: "Casa Teste",
            description: "Descrição",
            maxGuests: 4,
            basePricePerNight: 150,
        });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe("Casa Teste");
        expect(response.body).toHaveProperty("id");
    });

    it("deve retornar erro com código 400 e mensagem 'O nome é obrigatório' ao enviar um nome vazio", async () => {
        const response = await request(app)
            .post("/properties")
            .send({ id: "2", name: "", description: "Desc", maxGuests: 3, basePricePerNight: 100 })
            .set("Content-Type", "application/json");

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("O nome é obrigatório");
    });

    it("deve retornar erro com código 400 e mensagem 'O número máximo de hóspedes deve ser maior que zero' ao enviar maxGuests igual a zero ou negativo", async () => {
        const response = await request(app)
            .post("/properties")
            .send({ id: "3", name: "Casa", description: "Desc", maxGuests: 0, basePricePerNight: 100 })
            .set("Content-Type", "application/json");

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("O número máximo de hóspedes deve ser maior que zero");
    });

    it("deve retornar erro com código 400 e mensagem 'O preço base por noite é obrigatório' ao enviar basePricePerNight ausente", async () => {
        const responseMissing = await request(app)
            .post("/properties")
            .send({ id: "4", name: "Casa", description: "Desc", maxGuests: 2 })
            .set("Content-Type", "application/json");

        expect(responseMissing.status).toBe(400);
        expect(responseMissing.body.message).toBe("O preço base por noite é obrigatório");
    });
});
