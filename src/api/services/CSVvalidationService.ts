import ValidationResult from '../types/ValidationResult';

export default {
    validateMimeType(file: Express.Multer.File) {
        let ValidationResult: ValidationResult;
        ValidationResult.isError = false;

        if (file.mimetype !== 'text/csv') {
            ValidationResult.isError = true;
            ValidationResult.errorMSG = "The file should be a CSV file";
        }
        
        return ValidationResult;
    }
}