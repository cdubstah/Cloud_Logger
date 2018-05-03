const mongoose = require('mongoose');
const Log = mongoose.model('Log');
const fs = require('fs');

function file_upload(id, fileName, file) {
  const log = new Log({
    userId: id,
    logFileName: fileName,
    logFile: file
  });
  log.save();
}

function file_delete(userId, fileName, callback) {
  Log.findOneAndRemove(
    { userId: userId, logFileName: fileName },
    (err, file) => {
      if (err) throw err;

      if (file) {
        callback(true);
      } else {
        callback(false);
      }
    }
  );
}

function file_overwrite(userId, fileName, file, callback) {
  Log.findOneAndUpdate(
    { userId: userId, logFileName: fileName },
    { logFile: file },
    (err, file) => {
      if (err) throw err;

      if (file) {
        callback(true);
      } else {
        callback(false);
      }
    }
  );
}

function file_find(userId, fileName, callback) {
  Log.find({ userId: userId }, (err, files) => {
    if (err) callback(err, false);

    if (files) {
      if (files.length >= 2) {
        callback(err, 'maxLimit');
      } else {
        if (files.filter(x => x.logFileName == fileName).length >= 1) {
          callback(err, 'fileNameExist');
        } else {
          callback(err, 'validFile');
        }
      }
    } else {
      callback(err, 'validFile');
    }
  });
}

function file_get(userId, fileName, callback) {
  Log.findOne({ userId: userId, logFileName: fileName }, (err, file) => {
    if (err) callback(err, false);

    if (file) {
      callback(err, file.toJSON());
    } else {
      callback(err, null);
    }
  });
}

function file_rename(userId, oldFileName, newFileName, callback) {
  Log.findOneAndUpdate(
    { userId: userId, logFileName: oldFileName },
    { logFileName: newFileName },
    (err, entry) => {
      if (err) callback(false);

      if (entry) {
        callback(true);
      } else {
        callback(false);
      }
    }
  );
}

function file_getAllFiles(userId, callback) {
  Log.find({ userId: userId }, (err, files) => {
    if (err) callback(err, null);

    callback(err, files);
  });
}

module.exports = {
  file_upload,
  file_delete,
  file_overwrite,
  file_find,
  file_rename,
  file_get,
  file_getAllFiles
};
