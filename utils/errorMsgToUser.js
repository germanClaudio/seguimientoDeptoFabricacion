function getErrorLineNumber(error) {
    // Extract stack trace
    const stackLines = error.stack.split('\n');

    // Find the first line that contains the actual error location
    for (let line of stackLines) {
        if (line.includes('at')) {
            // This line typically contains the function name and file location
            const match = line.match(/at\s+(.*)\s+\((.*):(\d+):(\d+)\)/) || line.match(/at\s+(.*):(\d+):(\d+)/);

            if (match) {
                const functionName = match[1];
                const filePath = match[2];
                const lineNumber = match[3];
                const columnNumber = match[4];
                
                return {
                    functionName,
                    filePath,
                    lineNumber,
                    columnNumber
                };
            }
        }
    }
    return null;
}

module.exports = 
    getErrorLineNumber