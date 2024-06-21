export const extractData = (text, label) => {
    const regex = new RegExp(`.*${label}\\s*([^C]+)C\\.C\\.\\s*No\\.\\s*([\\d\\.]+)`, 'i');
    const match = text.match(regex);
    return match ? match[1].trim() : 'No encontrado';
};

export const extractCIIU = (text, label) => {
    const regex = new RegExp(`${label}:\\s*([^\\s]+)`);
    const match = text.match(regex);
    return match ? match[0].trim() : 'No encontrado';
};

export const extractObjetoSocial = (text, label) => {
    const regex = new RegExp(`${label}\\s*([^\\n]*)`, 'i');
    const match = text.match(regex);

    if (match) {
        const extractedText = match[1].trim();
        const firstSentence = extractedText.split('. ')[0] + '.';
        return firstSentence;
    } else {
        return 'No encontrado';
    }
};
