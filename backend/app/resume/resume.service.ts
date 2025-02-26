import { PrismaClient, Prisma, Resume } from "@prisma/client";

const prisma = new PrismaClient();

export class ResumeService {
  /**
   * Retrieves a resume by its ID.
   *
   * @param {string} resumeId - The unique identifier for the resume.
   * @returns {Promise<Resume | null>} - The resume object if found, or null if not found.
   * @throws {Error} - Throws an error if there's an issue with fetching the resume.
   */
  async getResumeById(resumeId: string): Promise<Resume | null> {
    try {
      return await prisma.resume.findUnique({ where: { id: resumeId } });
    } catch (error) {
      console.error("Error fetching resume:", error);
      throw new Error("Could not fetch resume");
    }
  }

  /**
   * Creates a new resume with the provided data.
   *
   * @param {Prisma.ResumeCreateInput} data - The data required to create a new resume.
   * @returns {Promise<Resume>} - The newly created resume.
   * @throws {Error} - Throws an error if there's an issue with creating the resume.
   */
  async createResume(data: Prisma.ResumeCreateInput): Promise<Resume> {
    try {
      return await prisma.resume.create({ data });
    } catch (error) {
      console.error("Error creating resume:", error);
      throw new Error("Could not create resume");
    }
  }

  /**
   * Updates an existing resume with the provided data.
   *
   * @param {string} resumeId - The unique identifier for the resume to be updated.
   * @param {Prisma.ResumeUpdateInput} data - The data to update the resume with.
   * @returns {Promise<Resume>} - The updated resume.
   * @throws {Error} - Throws an error if the resume is not found or there's an issue with updating.
   */
  async updateResume(
    resumeId: string,
    data: Prisma.ResumeUpdateInput
  ): Promise<Resume> {
    try {
      const resume = await prisma.resume.findUnique({
        where: { id: resumeId },
      });

      if (!resume) {
        throw new Error("Resume not found");
      }

      return await prisma.resume.update({
        where: { id: resumeId },
        data,
      });
    } catch (error) {
      console.error("Error updating resume:", error);
      throw new Error("Could not update resume");
    }
  }

  /**
   * Deletes a resume by its ID.
   *
   * @param {string} resumeId - The unique identifier for the resume to be deleted.
   * @returns {Promise<void>} - Resolves when the resume is deleted.
   * @throws {Error} - Throws an error if the resume is not found or there's an issue with deleting.
   */
  async deleteResume(resumeId: string): Promise<void> {
    try {
      const resume = await prisma.resume.findUnique({
        where: { id: resumeId },
      });

      if (!resume) {
        throw new Error("Resume not found");
      }

      await prisma.resume.delete({ where: { id: resumeId } });
    } catch (error) {
      console.error("Error deleting resume:", error);
      throw new Error("Could not delete resume");
    }
  }
}
