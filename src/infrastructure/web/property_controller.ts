import { Request, Response } from "express";
import { PropertyService } from "../../application/services/property_service";
import { Property } from "../../domain/entities/property";

export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  async createProperty(req: Request, res: Response): Promise<Response> {
    try {
      const { id, name, description, maxGuests, basePricePerNight } = req.body;

      const property = new Property(
        id,
        name,
        description,
        Number(maxGuests),
        Number(basePricePerNight)
      );

      await this.propertyService.createProperty(property);

      return res
        .status(201)
        .json({ id: property.getId(), name: property.getName() });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
