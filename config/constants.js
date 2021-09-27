'use strict'

const AWS = require('aws-sdk');

const short = require('short-uuid');
const Tables = {
  images: 'demoImages'
};
const S3URL = 'https://zignuts-shared.s3.ap-south-1.amazonaws.com/images/';

module.exports = {
  AWS,
  UID: short,
  Tables,
  S3URL
}