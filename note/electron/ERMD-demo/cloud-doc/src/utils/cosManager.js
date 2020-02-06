const COS = require('cos-nodejs-sdk-v5')
const fs = require('fs')

class cosManager {
  constructor(accesstId, accessKey, bucket, region) {
    this.cos = new COS({
      SecretId: accesstId,
      SecretKey: accessKey
    });
    // this.cos = new COS({
    //   getAuthorization: function (options, callback) {
    //     // 异步获取临时密钥
    //     request({
    //       url: 'http://127.0.0.1:3001/sts',
    //     }, function (err, response, body) {
    //       var data = JSON.parse(body);
    //       var credentials = data.credentials;
    //       callback({
    //         TmpSecretId: credentials.tmpSecretId,        // 临时密钥的 tmpSecretId
    //         TmpSecretKey: credentials.tmpSecretKey,      // 临时密钥的 tmpSecretKey
    //         XCosSecurityToken: credentials.sessionToken, // 临时密钥的 sessionToken
    //         ExpiredTime: data.expiredTime,               // 临时密钥失效时间戳，是申请临时密钥时，时间戳加 durationSeconds
    //       });
    //     });
    //   }
    // });
    this.bucket = bucket
    this.region = region
  }

  renameFile(oldkey, newkey, path) {
    return new Promise((resolve, reject) => {
      this.deleteFile(oldkey)
        .then((data) => {
          return this.uploadFIle(newkey, path)
        })
        .then((data) => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  uploadFIle(key, localFilePath) {
    return new Promise((resolve, reject) => {
      this.cos.putObject({
        Bucket: this.bucket, /* 必须 */
        Region: this.region,    /* 必须 */
        Key: key,              /* 必须 */
        StorageClass: 'STANDARD',
        Body: fs.createReadStream(localFilePath), // 上传文件对象
        onProgress: function (progressData) {
          console.log(JSON.stringify(progressData));
        }
      }, function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      });
    })

  }

  deleteFile(key) {
    return new Promise((resolve, reject) => {
      this.cos.deleteObject({
        Bucket: this.bucket, /* 必须 */
        Region: this.region,    /* 必须 */
        Key: key
      }, function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      });
    })
  }

  downloadFile(key, downloadPath) {
    return new Promise((resolve, reject) => {
      this.cos.getObject({
        Bucket: this.bucket, /* 必须 */
        Region: this.region,    /* 必须 */
        Key: key,              /* 必须 */
        Output: fs.createWriteStream(downloadPath),
      }, function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      });
    })
  }
  getStat(key) {
    return new Promise((reslove, reject) => {
      this.cos.getBucket({
        Bucket: this.bucket, /* 必须 */
        Region: this.region,    /* 必须 */
      }, function (err, data) {
        if (err) {
          reject(err)
        } else {
          let find = false
          data.Contents.forEach(item => {
            if (item.Key === key) {
              find = true
              reslove(item)
            }
          })
          if (!find) {
            reject('noFile')
          }
        }
      });
    })
  }
  getAllStat() {
    return new Promise((resolve, reject) => {
      this.cos.getBucket({
        Bucket: this.bucket, /* 必须 */
        Region: this.region,    /* 必须 */
      }, function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data.Contents)
        }
      })
    })
  }

}


module.exports = cosManager