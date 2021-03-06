"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var asn1js = _interopRequireWildcard(require("asn1js"));

var _pvutils = require("pvutils");

var _common = require("./common.js");

var _TBSRequest = _interopRequireDefault(require("./TBSRequest.js"));

var _Signature = _interopRequireDefault(require("./Signature.js"));

var _Request = _interopRequireDefault(require("./Request.js"));

var _CertID = _interopRequireDefault(require("./CertID.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//**************************************************************************************

/**
 * Class from RFC6960
 */
class OCSPRequest {
  //**********************************************************************************

  /**
   * Constructor for OCSPRequest class
   * @param {Object} [parameters={}]
   * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
   */
  constructor(parameters = {}) {
    //region Internal properties of the object

    /**
     * @type {TBSRequest}
     * @desc tbsRequest
     */
    this.tbsRequest = (0, _pvutils.getParametersValue)(parameters, "tbsRequest", OCSPRequest.defaultValues("tbsRequest"));
    if ("optionalSignature" in parameters)
      /**
       * @type {Signature}
       * @desc optionalSignature
       */
      this.optionalSignature = (0, _pvutils.getParametersValue)(parameters, "optionalSignature", OCSPRequest.defaultValues("optionalSignature")); //endregion
    //region If input argument array contains "schema" for this object

    if ("schema" in parameters) this.fromSchema(parameters.schema); //endregion
  } //**********************************************************************************

  /**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


  static defaultValues(memberName) {
    switch (memberName) {
      case "tbsRequest":
        return new _TBSRequest.default();

      case "optionalSignature":
        return new _Signature.default();

      default:
        throw new Error(`Invalid member name for OCSPRequest class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Compare values with default values for all class members
   * @param {string} memberName String name for a class member
   * @param {*} memberValue Value to compare with default value
   */


  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case "tbsRequest":
        // noinspection OverlyComplexBooleanExpressionJS
        return _TBSRequest.default.compareWithDefault("tbs", memberValue.tbs) && _TBSRequest.default.compareWithDefault("version", memberValue.version) && _TBSRequest.default.compareWithDefault("requestorName", memberValue.requestorName) && _TBSRequest.default.compareWithDefault("requestList", memberValue.requestList) && _TBSRequest.default.compareWithDefault("requestExtensions", memberValue.requestExtensions);

      case "optionalSignature":
        return _Signature.default.compareWithDefault("signatureAlgorithm", memberValue.signatureAlgorithm) && _Signature.default.compareWithDefault("signature", memberValue.signature) && _Signature.default.compareWithDefault("certs", memberValue.certs);

      default:
        throw new Error(`Invalid member name for OCSPRequest class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Return value of pre-defined ASN.1 schema for current class
   *
   * ASN.1 schema:
   * ```asn1
   * OCSPRequest     ::=     SEQUENCE {
   *    tbsRequest                  TBSRequest,
   *    optionalSignature   [0]     EXPLICIT Signature OPTIONAL }
   * ```
   *
   * @param {Object} parameters Input parameters for the schema
   * @returns {Object} asn1js schema object
   */


  static schema(parameters = {}) {
    /**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [tbsRequest]
     * @property {string} [optionalSignature]
     */
    const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
    return new asn1js.Sequence({
      name: names.blockName || "OCSPRequest",
      value: [_TBSRequest.default.schema(names.tbsRequest || {
        names: {
          blockName: "tbsRequest"
        }
      }), new asn1js.Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          // CONTEXT-SPECIFIC
          tagNumber: 0 // [0]

        },
        value: [_Signature.default.schema(names.optionalSignature || {
          names: {
            blockName: "optionalSignature"
          }
        })]
      })]
    });
  } //**********************************************************************************

  /**
   * Convert parsed asn1js object into current class
   * @param {!Object} schema
   */


  fromSchema(schema) {
    //region Clear input data first
    (0, _pvutils.clearProps)(schema, ["tbsRequest", "optionalSignature"]); //endregion
    //region Check the schema is valid

    const asn1 = asn1js.compareSchema(schema, schema, OCSPRequest.schema());
    if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for OCSPRequest"); //endregion
    //region Get internal properties from parsed schema

    this.tbsRequest = new _TBSRequest.default({
      schema: asn1.result.tbsRequest
    });
    if ("optionalSignature" in asn1.result) this.optionalSignature = new _Signature.default({
      schema: asn1.result.optionalSignature
    }); //endregion
  } //**********************************************************************************

  /**
   * Convert current object to asn1js object and set correct values
   * @param {boolean} encodeFlag If param equal to false then create TBS schema via decoding stored value. In othe case create TBS schema via assembling from TBS parts.
   * @returns {Object} asn1js object
   */


  toSchema(encodeFlag = false) {
    //region Create array for output sequence
    const outputArray = [];
    outputArray.push(this.tbsRequest.toSchema(encodeFlag));
    if ("optionalSignature" in this) outputArray.push(this.optionalSignature.toSchema()); //endregion
    //region Construct and return new ASN.1 schema for this object

    return new asn1js.Sequence({
      value: outputArray
    }); //endregion
  } //**********************************************************************************

  /**
   * Convertion for the class to JSON object
   * @returns {Object}
   */


  toJSON() {
    const _object = {
      tbsRequest: this.tbsRequest.toJSON()
    };
    if ("optionalSignature" in this) _object.optionalSignature = this.optionalSignature.toJSON();
    return _object;
  } //**********************************************************************************

  /**
   * Making OCSP Request for specific certificate
   * @param {Certificate} certificate Certificate making OCSP Request for
   * @param {Object} parameters Additional parameters
   * @returns {Promise}
   */


  createForCertificate(certificate, parameters) {
    //region Initial variables
    let sequence = Promise.resolve();
    const certID = new _CertID.default(); //endregion
    //region Create OCSP certificate identifier for the certificate

    sequence = sequence.then(() => certID.createForCertificate(certificate, parameters)); //endregion
    //region Make final request data

    sequence = sequence.then(() => {
      this.tbsRequest = new _TBSRequest.default({
        requestList: [new _Request.default({
          reqCert: certID
        })]
      });
    }, error => Promise.reject(error)); //endregion

    return sequence;
  } //**********************************************************************************

  /**
   * Make signature for current OCSP Request
   * @param {Object} privateKey Private key for "subjectPublicKeyInfo" structure
   * @param {string} [hashAlgorithm] Hashing algorithm. Default SHA-1
   * @returns {Promise}
   */


  sign(privateKey, hashAlgorithm = "SHA-1") {
    //region Initial checking
    //region Check private key
    if (typeof privateKey === "undefined") return Promise.reject("Need to provide a private key for signing"); //endregion
    //region Check that "optionalSignature" exists in the current request

    if ("optionalSignature" in this === false) return Promise.reject("Need to create \"optionalSignature\" field before signing"); //endregion
    //endregion
    //region Initial variables

    let sequence = Promise.resolve();
    let parameters;
    let tbs;
    const engine = (0, _common.getEngine)(); //endregion
    //region Get a "default parameters" for current algorithm and set correct signature algorithm

    sequence = sequence.then(() => engine.subtle.getSignatureParameters(privateKey, hashAlgorithm));
    sequence = sequence.then(result => {
      parameters = result.parameters;
      this.optionalSignature.signatureAlgorithm = result.signatureAlgorithm;
    }); //endregion
    //region Create TBS data for signing

    sequence = sequence.then(() => {
      tbs = this.tbsRequest.toSchema(true).toBER(false);
    }); //endregion
    //region Signing TBS data on provided private key

    sequence = sequence.then(() => engine.subtle.signWithPrivateKey(tbs, privateKey, parameters));
    sequence = sequence.then(result => {
      this.optionalSignature.signature = new asn1js.BitString({
        valueHex: result
      });
    }); //endregion

    return sequence;
  } //**********************************************************************************


  verify() {// TODO: Create the function
  } //**********************************************************************************


} //**************************************************************************************


exports.default = OCSPRequest;
//# sourceMappingURL=OCSPRequest.js.map