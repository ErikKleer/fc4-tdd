import { Booking } from "../../../domain/entities/booking";
import { Property } from "../../../domain/entities/property";
import { User } from "../../../domain/entities/user";
import { DateRange } from "../../../domain/value_objects/date_range";
import { BookingEntity } from "../entities/booking_entity";
import { PropertyEntity } from "../entities/property_entity";
import { UserEntity } from "../entities/user_entity";
import { BookingMapper } from "./booking_mapper";

describe("BookingMapper", () => {

    it("deve converter BookingEntity em Booking corretamente", () => {
        const bookingEntity = new BookingEntity();
        bookingEntity.id = "1";
        bookingEntity.startDate = new Date("2024-12-20");
        bookingEntity.endDate = new Date("2024-12-25");
        bookingEntity.guestCount = 2;
        bookingEntity.totalPrice = 500;
        bookingEntity.status = "CONFIRMED";

        const propertyEntity = new PropertyEntity();
        propertyEntity.id = "1";
        propertyEntity.name = "Casa na praia";
        propertyEntity.description = "Vista para o mar";
        propertyEntity.maxGuests = 6;
        propertyEntity.basePricePerNight = 200;

        const userEntity = new UserEntity();
        userEntity.id = "1";
        userEntity.name = "Carlos";

        bookingEntity.property = propertyEntity;
        bookingEntity.guest = userEntity;

        const bookingDomain = BookingMapper.toDomain(bookingEntity);

        expect(bookingDomain).toBeInstanceOf(Booking);
        expect(bookingDomain.getId()).toBe("1");
        expect(bookingDomain.getProperty()).toBeInstanceOf(Property);
        expect(bookingDomain.getUser()).toBeInstanceOf(User);
        expect(bookingDomain.getDateRange()).toBeInstanceOf(DateRange);
        expect(bookingDomain.getGuestCount()).toBe(2);
        expect(bookingDomain.getTotalPrice()).toBe(500);
        expect(bookingDomain.getStatus()).toBe("CONFIRMED");
    });

    it("deve lançar erro de validação ao faltar campos obrigatórios no BookingEntity", () => {
        const bookingEntity = new BookingEntity();
        bookingEntity.startDate = new Date("2024-12-20");
        bookingEntity.endDate = new Date("2024-12-25");
        bookingEntity.guestCount = 2;
        bookingEntity.totalPrice = 500;
        bookingEntity.status = "CONFIRMED";

        expect(() => BookingMapper.toDomain(bookingEntity)).toThrow();
    });

    it("deve converter Booking para BookingEntity corretamente", () => {
        const bookingProperty = new Property("1", "Casa na praia", "Vista para o mar", 6, 200);
        const bookingUser = new User("1", "Carlos");
        const bookingDateRange = new DateRange(new Date("2024-12-20"), new Date("2024-12-25"));

        const bookingDomain = new Booking(
            "1",
            bookingProperty,
            bookingUser,
            bookingDateRange,
            2
        );

        const bookingEntity = BookingMapper.toPersistence(bookingDomain);

        expect(bookingEntity).toBeInstanceOf(BookingEntity);
        expect(bookingEntity.id).toBe("1");
        expect(bookingEntity.property).toBeInstanceOf(PropertyEntity);
        expect(bookingEntity.guest).toBeInstanceOf(UserEntity);
        expect(bookingEntity.startDate).toEqual(new Date("2024-12-20"));
        expect(bookingEntity.endDate).toEqual(new Date("2024-12-25"));
        expect(bookingEntity.guestCount).toBe(2);
        expect(bookingEntity.totalPrice).toBe(1000);
        expect(bookingEntity.status).toBe("CONFIRMED");
    });

});
