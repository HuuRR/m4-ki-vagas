import AppDataSource from "../../data-source";
import { Applications } from "../../entities/applications.entity";
import { AppError } from "../../errors/AppError";
import { IApplicationUpdate } from "../../interfaces/application";

const updateApplicationAvailabilityService = async (
  id: string,
  { isActive, valid }: IApplicationUpdate
) => {
  if (isActive === undefined) {
    throw new AppError("This isActive is invalid.", 400);
  }

  if (!valid) {
    throw new AppError("This valid is invalid. (must be like yyyy/mm/dd).", 400);
  }

  const applicationRepository = AppDataSource.getRepository(Applications);

  const application = await applicationRepository.findOne({ where: { id } });

  if (!application) throw new AppError("Application Not Found.", 404);

  await applicationRepository.update(id, {
    isActive: isActive || application.isActive,
    valid: valid || application.valid,
  });

  const updatedApplication = await applicationRepository.findOne({
    where: { id },
  });

  return updatedApplication!;
};
export default updateApplicationAvailabilityService;
