function createException(name) {
    class CustomException extends Error {
        constructor(message) {
            super(message || name);
            this.name = name;
        }
    }
    return CustomException;
}

exports.InvalidLoginException = createException('InvalidLoginException');
exports.ExistsException = createException('ExistsException');
exports.DoesNotExistException = createException('DoesNotExistException');
