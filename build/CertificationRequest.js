"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var asn1js = _interopRequireWildcard(require("asn1js"));

var _pvutils = require("pvutils");

var _common = require("./common.js");

var _PublicKeyInfo = _interopRequireDefault(require("./PublicKeyInfo.js"));

var _RelativeDistinguishedNames = _interopRequireDefault(require("./RelativeDistinguishedNames.js"));

var _AlgorithmIdentifier = _interopRequireDefault(require("./AlgorithmIdentifier.js"));

var _Attribute = _interopRequireDefault(require("./Attribute.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//**************************************************************************************
function CertificationRequestInfo(parameters = {}) {
  //CertificationRequestInfo ::= SEQUENCE {
  //    version       INTEGER { v1(0) } (v1,...),
  //    subject       Name,
  //    subjectPKInfo SubjectPublicKeyInfo{{ PKInfoAlgorithms }},
  //    attributes    [0] Attributes{{ CRIAttributes }}
  //}

  /**
   * @type {Object}
   * @property {string} [blockName]
   * @property {string} [CertificationRequestInfo]
   * @property {string} [CertificationRequestInfoVersion]
   * @property {string} [subject]
   * @property {string} [CertificationRequestInfoAttributes]
   * @property {string} [attributes]
   */
  const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
  return new asn1js.Sequence({
    name: names.CertificationRequestInfo || "CertificationRequestInfo",
    value: [new asn1js.Integer({
      name: names.CertificationRequestInfoVersion || "CertificationRequestInfo.version"
    }), _RelativeDistinguishedNames.default.schema(names.subject || {
      names: {
        blockName: "CertificationRequestInfo.subject"
      }
    }), _PublicKeyInfo.default.schema({
      names: {
        blockName: "CertificationRequestInfo.subjectPublicKeyInfo"
      }
    }), new asn1js.Constructed({
      optional: true,
      idBlock: {
        tagClass: 3,
        // CONTEXT-SPECIFIC
        tagNumber: 0 // [0]

      },
      value: [new asn1js.Repeated({
        optional: true,
        // Because OpenSSL makes wrong "attributes" field
        name: names.CertificationRequestInfoAttributes || "CertificationRequestInfo.attributes",
        value: _Attribute.default.schema(names.attributes || {})
      })]
    })]
  });
} //**************************************************************************************

/**
 * Class from RFC2986
 */


class CertificationRequest {
  //**********************************************************************************

  /**
   * Constructor for Attribute class
   * @param {Object} [parameters={}]
   * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
   */
  constructor(parameters = {}) {
    //region Internal properties of the object

    /**
     * @type {ArrayBuffer}
     * @desc tbs
     */
    this.tbs = (0, _pvutils.getParametersValue)(parameters, "tbs", CertificationRequest.defaultValues("tbs"));
    /**
     * @type {number}
     * @desc version
     */

    this.version = (0, _pvutils.getParametersValue)(parameters, "version", CertificationRequest.defaultValues("version"));
    /**
     * @type {RelativeDistinguishedNames}
     * @desc subject
     */

    this.subject = (0, _pvutils.getParametersValue)(parameters, "subject", CertificationRequest.defaultValues("subject"));
    /**
     * @type {PublicKeyInfo}
     * @desc subjectPublicKeyInfo
     */

    this.subjectPublicKeyInfo = (0, _pvutils.getParametersValue)(parameters, "subjectPublicKeyInfo", CertificationRequest.defaultValues("subjectPublicKeyInfo"));
    if ("attributes" in parameters)
      /**
       * @type {Array.<Attribute>}
       * @desc attributes
       */
      this.attributes = (0, _pvutils.getParametersValue)(parameters, "attributes", CertificationRequest.defaultValues("attributes"));
    /**
     * @type {AlgorithmIdentifier}
     * @desc signatureAlgorithm
     */

    this.signatureAlgorithm = (0, _pvutils.getParametersValue)(parameters, "signatureAlgorithm", CertificationRequest.defaultValues("signatureAlgorithm"));
    /**
     * @type {BitString}
     * @desc signatureAlgorithm
     */

    this.signatureValue = (0, _pvutils.getParametersValue)(parameters, "signatureValue", CertificationRequest.defaultValues("signatureValue")); //endregion
    //region If input argument array contains "schema" for this object

    if ("schema" in parameters) this.fromSchema(parameters.schema); //endregion
  } //**********************************************************************************

  /**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


  static defaultValues(memberName) {
    switch (memberName) {
      case "tbs":
        return new ArrayBuffer(0);

      case "version":
        return 0;

      case "subject":
        return new _RelativeDistinguishedNames.default();

      case "subjectPublicKeyInfo":
        return new _PublicKeyInfo.default();

      case "attributes":
        return [];

      case "signatureAlgorithm":
        return new _AlgorithmIdentifier.default();

      case "signatureValue":
        return new asn1js.BitString();

      default:
        throw new Error(`Invalid member name for CertificationRequest class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Return value of pre-defined ASN.1 schema for current class
   *
   * ASN.1 schema:
   * ```asn1
   * CertificationRequest ::= SEQUENCE {
   *    certificationRequestInfo CertificationRequestInfo,
   *    signatureAlgorithm       AlgorithmIdentifier{{ SignatureAlgorithms }},
   *    signature                BIT STRING
   * }
   * ```
   *
   * @param {Object} parameters Input parameters for the schema
   * @returns {Object} asn1js schema object
   */


  static schema(parameters = {}) {
    /**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [certificationRequestInfo]
     * @property {string} [signatureAlgorithm]
     * @property {string} [signatureValue]
     */
    const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
    return new asn1js.Sequence({
      value: [CertificationRequestInfo(names.certificationRequestInfo || {}), new asn1js.Sequence({
        name: names.signatureAlgorithm || "signatureAlgorithm",
        value: [new asn1js.ObjectIdentifier(), new asn1js.Any({
          optional: true
        })]
      }), new asn1js.BitString({
        name: names.signatureValue || "signatureValue"
      })]
    });
  } //**********************************************************************************

  /**
   * Convert parsed asn1js object into current class
   * @param {!Object} schema
   */


  fromSchema(schema) {
    //region Clear input data first
    (0, _pvutils.clearProps)(schema, ["CertificationRequestInfo", "CertificationRequestInfo.version", "CertificationRequestInfo.subject", "CertificationRequestInfo.subjectPublicKeyInfo", "CertificationRequestInfo.attributes", "signatureAlgorithm", "signatureValue"]); //endregion
    //region Check the schema is valid

    const asn1 = asn1js.compareSchema(schema, schema, CertificationRequest.schema());
    if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for CertificationRequest"); //endregion
    //region Get internal properties from parsed schema

    this.tbs = asn1.result.CertificationRequestInfo.valueBeforeDecode;
    this.version = asn1.result["CertificationRequestInfo.version"].valueBlock.valueDec;
    this.subject = new _RelativeDistinguishedNames.default({
      schema: asn1.result["CertificationRequestInfo.subject"]
    });
    this.subjectPublicKeyInfo = new _PublicKeyInfo.default({
      schema: asn1.result["CertificationRequestInfo.subjectPublicKeyInfo"]
    });
    if ("CertificationRequestInfo.attributes" in asn1.result) this.attributes = Array.from(asn1.result["CertificationRequestInfo.attributes"], element => new _Attribute.default({
      schema: element
    }));
    this.signatureAlgorithm = new _AlgorithmIdentifier.default({
      schema: asn1.result.signatureAlgorithm
    });
    this.signatureValue = asn1.result.signatureValue; //endregion
  } //**********************************************************************************

  /**
   * Aux function making ASN1js Sequence from current TBS
   * @returns {Sequence}
   */


  encodeTBS() {
    //region Create array for output sequence
    const outputArray = [new asn1js.Integer({
      value: this.version
    }), this.subject.toSchema(), this.subjectPublicKeyInfo.toSchema()];

    if ("attributes" in this) {
      outputArray.push(new asn1js.Constructed({
        idBlock: {
          tagClass: 3,
          // CONTEXT-SPECIFIC
          tagNumber: 0 // [0]

        },
        value: Array.from(this.attributes, element => element.toSchema())
      }));
    } //endregion


    return new asn1js.Sequence({
      value: outputArray
    });
  } //**********************************************************************************

  /**
   * Convert current object to asn1js object and set correct values
   * @returns {Object} asn1js object
   */


  toSchema(encodeFlag = false) {
    //region Decode stored TBS value
    let tbsSchema;

    if (encodeFlag === false) {
      if (this.tbs.byteLength === 0) // No stored TBS part
        return CertificationRequest.schema();
      tbsSchema = asn1js.fromBER(this.tbs).result;
    } //endregion
    //region Create TBS schema via assembling from TBS parts
    else tbsSchema = this.encodeTBS(); //endregion
    //region Construct and return new ASN.1 schema for this object


    return new asn1js.Sequence({
      value: [tbsSchema, this.signatureAlgorithm.toSchema(), this.signatureValue]
    }); //endregion
  } //**********************************************************************************

  /**
   * Convertion for the class to JSON object
   * @returns {Object}
   */


  toJSON() {
    const object = {
      tbs: (0, _pvutils.bufferToHexCodes)(this.tbs, 0, this.tbs.byteLength),
      version: this.version,
      subject: this.subject.toJSON(),
      subjectPublicKeyInfo: this.subjectPublicKeyInfo.toJSON(),
      signatureAlgorithm: this.signatureAlgorithm.toJSON(),
      signatureValue: this.signatureValue.toJSON()
    };
    if ("attributes" in this) object.attributes = Array.from(this.attributes, element => element.toJSON());
    return object;
  } //**********************************************************************************

  /**
   * Makes signature for currect certification request
   * @param {Object} privateKey WebCrypto private key
   * @param {string} [hashAlgorithm=SHA-1] String representing current hashing algorithm
   */


  sign(privateKey, hashAlgorithm = "SHA-1") {
    //region Initial checking
    //region Get a private key from function parameter
    if (typeof privateKey === "undefined") return Promise.reject("Need to provide a private key for signing"); //endregion
    //endregion
    //region Initial variables

    let sequence = Promise.resolve();
    let parameters;
    const engine = (0, _common.getEngine)(); //endregion
    //region Get a "default parameters" for current algorithm and set correct signature algorithm

    sequence = sequence.then(() => engine.subtle.getSignatureParameters(privateKey, hashAlgorithm));
    sequence = sequence.then(result => {
      parameters = result.parameters;
      this.signatureAlgorithm = result.signatureAlgorithm;
    }); //endregion
    //region Create TBS data for signing

    sequence = sequence.then(() => {
      this.tbs = this.encodeTBS().toBER(false);
    }); //endregion
    //region Signing TBS data on provided private key

    sequence = sequence.then(() => engine.subtle.signWithPrivateKey(this.tbs, privateKey, parameters));
    sequence = sequence.then(result => {
      this.signatureValue = new asn1js.BitString({
        valueHex: result
      });
    }); //endregion

    return sequence;
  } //**********************************************************************************

  /**
   * Verify existing certification request signature
   * @returns {*}
   */


  verify() {
    return (0, _common.getEngine)().subtle.verifyWithPublicKey(this.tbs, this.signatureValue, this.subjectPublicKeyInfo, this.signatureAlgorithm);
  } //**********************************************************************************

  /**
   * Importing public key for current certificate request
   */


  getPublicKey(parameters = null) {
    return (0, _common.getEngine)().getPublicKey(this.subjectPublicKeyInfo, this.signatureAlgorithm, parameters);
  } //**********************************************************************************


} //**************************************************************************************


exports.default = CertificationRequest;
//# sourceMappingURL=CertificationRequest.js.map