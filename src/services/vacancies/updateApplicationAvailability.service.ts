import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";

const updateApplicationAvailabilityService = async (id, isActive, valid) => {
  const applicationRepository = AppDataSource.getRepository(Application);

  const application = await applicationRepository.findOne({ where: { id } });

  if (!application) throw new AppError("Application Not Found.", 404);

  await applicationRepository.update(id, {
    isActive: isActive || application.application,
    valid: valid || application.valid,
  });

  const updatedApplication = await applicationRepository.findOne({
    where: { id },
  });

  return updatedApplication!;
};
export default updateApplicationAvailabilityService;
