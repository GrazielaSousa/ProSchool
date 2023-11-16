const Document = require('../models/documentsData');

module.exports = {
  async getFile(req, res) {
    try {
      Document.find({}).then((data) => {
        res.send({ status: 'ok', data: data });
      });
    } catch (error) {
      res.status(500).json({ status: error });
    }
  },

  async deleteFile(req, res) {
    const { id } = req.params;
    
    const file = await Document.findById({_id : id});

    if (!file) {
      return res.status(404).json({ message: 'Arquivo não encontrado' });
    }

    const s3Key = file.titleAWS;
    await s3Key.deleteObject({Bucket: 'proschool-tcc', Key: s3Key}).promise();
    const fileDeleted = await Document.findByIdAndDelete({ _id: id});
    if(fileDeleted){
      return res.json(fileDeleted);
    }
    return res.status(404).json({ message: 'Arquivo não encontrado' });
  },

  async getMaterialStudent(req, res) {
    const {subject , degree} = req.params;

    try {
      Document.find({subject: subject, degree: degree}).then((data) => {
        res.send({ status: 'ok', data: data });
      });
    } catch (error) {
      res.status(500).json({ status: error });
    }
  },
};
