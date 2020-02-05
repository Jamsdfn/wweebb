const COS = require('cos-nodejs-sdk-v5')
const fs = require('fs')
const request = require('request')

class cosManager {
  constructor(accesstId, accessKey, bucket, region) {
    // 在开发阶段我们用临时密钥就可以了
    // TODO: 根据用户自己添加的密钥，在设置界面可以加一个添加密钥功能(添加的值放入store中)，用于上传用户自己的bucket
    // this.cos = new COS({
    //   SecretId: accesstId,
    //   SecretKey: accessKey
    // });
    this.cos = new COS({
      getAuthorization: function (options, callback) {
        // 异步获取临时密钥
        request({
          url: 'http://127.0.0.1:3001/sts',
        }, function (err, response, body) {
          var data = JSON.parse(body);
          var credentials = data.credentials;
          callback({
            TmpSecretId: credentials.tmpSecretId,        // 临时密钥的 tmpSecretId
            TmpSecretKey: credentials.tmpSecretKey,      // 临时密钥的 tmpSecretKey
            XCosSecurityToken: credentials.sessionToken, // 临时密钥的 sessionToken
            ExpiredTime: data.expiredTime,               // 临时密钥失效时间戳，是申请临时密钥时，时间戳加 durationSeconds
          });
        });
      }
    });
    this.bucket = bucket
    this.region = region
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
}

module.exports = cosManager