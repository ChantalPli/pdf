import pkg from 'mongoose';
const { Schema, model } = pkg;

const documentSchema = new Schema({
    legalRepresentative: String,
    alternateLegalRepresentative: String,
    societyActivity: String,
    ciiuCode: String,
    fileId: String,
});

const Document = model('Document', documentSchema);

export default Document;
