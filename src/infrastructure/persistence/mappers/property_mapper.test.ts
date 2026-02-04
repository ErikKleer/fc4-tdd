import { Property } from "../../../domain/entities/property";
import { PropertyEntity } from "../entities/property_entity";
import { PropertyMapper } from "./property_mapper";

describe("PropertyMapper", () => {
  it("deve converter PropertyEntity em Property corretamente", () => {
    const propertyEntity = new PropertyEntity();
    propertyEntity.id = "1";
    propertyEntity.name = "Casa na praia";
    propertyEntity.description = "Vista para o mar";
    propertyEntity.maxGuests = 6;
    propertyEntity.basePricePerNight = 200;

    const propertyDomain = PropertyMapper.toDomain(propertyEntity);

    expect(propertyDomain).toBeInstanceOf(Property);
    expect(propertyDomain.getId()).toBe("1");
    expect(propertyDomain.getName()).toBe("Casa na praia");
    expect(propertyDomain.getDescription()).toBe("Vista para o mar");
    expect(propertyDomain.getMaxGuests()).toBe(6);
    expect(propertyDomain.getBasePricePerNight()).toBe(200);
  });

  it("deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity", () => {
    const propertyEntity = new PropertyEntity();
    propertyEntity.name = "Casa na praia";
    propertyEntity.description = "Vista para o mar";
    propertyEntity.maxGuests = 6;
    propertyEntity.basePricePerNight = 200;

    expect(() => PropertyMapper.toDomain(propertyEntity)).toThrow();
  });

  it("deve converter Property para PropertyEntity corretamente", () => {
    const propertyDomain = new Property(
      "1",
      "Casa na praia",
      "Vista para o mar",
      6,
      200
    );

    const propertyEntity = PropertyMapper.toPersistence(propertyDomain);

    expect(propertyEntity).toBeInstanceOf(PropertyEntity);
    expect(propertyEntity.id).toBe("1");
    expect(propertyEntity.name).toBe("Casa na praia");
    expect(propertyEntity.description).toBe("Vista para o mar");
    expect(propertyEntity.maxGuests).toBe(6);
    expect(propertyEntity.basePricePerNight).toBe(200);
  });
});
