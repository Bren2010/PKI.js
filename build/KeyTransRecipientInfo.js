"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var asn1js = _interopRequireWildcard(require("asn1js"));

var _pvutils = require("pvutils");

var _AlgorithmIdentifier = _interopRequireDefault(require("./AlgorithmIdentifier.js"));

var _Certificate = _interopRequireDefault(require("./Certificate.js"));

var _RecipientIdentifier = _interopRequireDefault(require("./RecipientIdentifier.js"));

var _IssuerAndSerialNumber = _interopRequireDefault(require("./IssuerAndSerialNumber.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//**************************************************************************************

/**
 * Class from RFC5652
 */
class KeyTransRecipientInfo {
  //**********************************************************************************

  /**
   * Constructor for KeyTransRecipientInfo class
   * @param {Object} [parameters={}]
   * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
   */
  constructor(parameters = {}) {
    //region Internal properties of the object

    /**
     * @type {number}
     * @desc version
     */
    this.version = (0, _pvutils.getParametersValue)(parameters, "version", KeyTransRecipientInfo.defaultValues("version"));
    /**
     * @type {RecipientIdentifier}
     * @desc rid
     */

    this.rid = (0, _pvutils.getParametersValue)(parameters, "rid", KeyTransRecipientInfo.defaultValues("rid"));
    /**
     * @type {AlgorithmIdentifier}
     * @desc keyEncryptionAlgorithm
     */

    this.keyEncryptionAlgorithm = (0, _pvutils.getParametersValue)(parameters, "keyEncryptionAlgorithm", KeyTransRecipientInfo.defaultValues("keyEncryptionAlgorithm"));
    /**
     * @type {OctetString}
     * @desc encryptedKey
     */

    this.encryptedKey = (0, _pvutils.getParametersValue)(parameters, "encryptedKey", KeyTransRecipientInfo.defaultValues("encryptedKey"));
    /**
     * @type {Certificate}
     * @desc recipientCertificate For some reasons we need to store recipient's certificate here
     */

    this.recipientCertificate = (0, _pvutils.getParametersValue)(parameters, "recipientCertificate", KeyTransRecipientInfo.defaultValues("recipientCertificate")); //endregion
    //region If input argument array contains "schema" for this object

    if ("schema" in parameters) this.fromSchema(parameters.schema); //endregion
  } //**********************************************************************************

  /**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


  static defaultValues(memberName) {
    switch (memberName) {
      case "version":
        return -1;

      case "rid":
        return {};

      case "keyEncryptionAlgorithm":
        return new _AlgorithmIdentifier.default();

      case "encryptedKey":
        return new asn1js.OctetString();

      case "recipientCertificate":
        return new _Certificate.default();

      default:
        throw new Error(`Invalid member name for KeyTransRecipientInfo class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Compare values with default values for all class members
   * @param {string} memberName String name for a class member
   * @param {*} memberValue Value to compare with default value
   */


  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case "version":
        return memberValue === KeyTransRecipientInfo.defaultValues("version");

      case "rid":
        return Object.keys(memberValue).length === 0;

      case "keyEncryptionAlgorithm":
      case "encryptedKey":
        return memberValue.isEqual(KeyTransRecipientInfo.defaultValues(memberName));

      case "recipientCertificate":
        return false;
      // For now we do not need to compare any values with the "recipientCertificate"

      default:
        throw new Error(`Invalid member name for KeyTransRecipientInfo class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Return value of pre-defined ASN.1 schema for current class
   *
   * ASN.1 schema:
   * ```asn1
   * KeyTransRecipientInfo ::= SEQUENCE {
   *    version CMSVersion,  -- always set to 0 or 2
   *    rid RecipientIdentifier,
   *    keyEncryptionAlgorithm KeyEncryptionAlgorithmIdentifier,
   *    encryptedKey EncryptedKey }
   * ```
   *
   * @param {Object} parameters Input parameters for the schema
   * @returns {Object} asn1js schema object
   */


  static schema(parameters = {}) {
    /**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [version]
     * @property {string} [rid]
     * @property {string} [keyEncryptionAlgorithm]
     * @property {string} [encryptedKey]
     */
    const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
    return new asn1js.Sequence({
      name: names.blockName || "",
      value: [new asn1js.Integer({
        name: names.version || ""
      }), _RecipientIdentifier.default.schema(names.rid || {}), _AlgorithmIdentifier.default.schema(names.keyEncryptionAlgorithm || {}), new asn1js.OctetString({
        name: names.encryptedKey || ""
      })]
    });
  } //**********************************************************************************

  /**
   * Convert parsed asn1js object into current class
   * @param {!Object} schema
   */


  fromSchema(schema) {
    //region Clear input data first
    (0, _pvutils.clearProps)(schema, ["version", "rid", "keyEncryptionAlgorithm", "encryptedKey"]); //endregion
    //region Check the schema is valid

    const asn1 = asn1js.compareSchema(schema, schema, KeyTransRecipientInfo.schema({
      names: {
        version: "version",
        rid: {
          names: {
            blockName: "rid"
          }
        },
        keyEncryptionAlgorithm: {
          names: {
            blockName: "keyEncryptionAlgorithm"
          }
        },
        encryptedKey: "encryptedKey"
      }
    }));
    if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for KeyTransRecipientInfo"); //endregion
    //region Get internal properties from parsed schema

    this.version = asn1.result.version.valueBlock.valueDec;
    if (asn1.result.rid.idBlock.tagClass === 3) this.rid = new asn1js.OctetString({
      valueHex: asn1.result.rid.valueBlock.valueHex
    }); // SubjectKeyIdentifier
    else this.rid = new _IssuerAndSerialNumber.default({
        schema: asn1.result.rid
      });
    this.keyEncryptionAlgorithm = new _AlgorithmIdentifier.default({
      schema: asn1.result.keyEncryptionAlgorithm
    });
    this.encryptedKey = asn1.result.encryptedKey; //endregion
  } //**********************************************************************************

  /**
   * Convert current object to asn1js object and set correct values
   * @returns {Object} asn1js object
   */


  toSchema() {
    //region Create array for output sequence 
    const outputArray = [];

    if (this.rid instanceof _IssuerAndSerialNumber.default) {
      this.version = 0;
      outputArray.push(new asn1js.Integer({
        value: this.version
      }));
      outputArray.push(this.rid.toSchema());
    } else {
      this.version = 2;
      outputArray.push(new asn1js.Integer({
        value: this.version
      }));
      outputArray.push(new asn1js.Primitive({
        idBlock: {
          tagClass: 3,
          // CONTEXT-SPECIFIC
          tagNumber: 0 // [0]

        },
        valueHex: this.rid.valueBlock.valueHex
      }));
    }

    outputArray.push(this.keyEncryptionAlgorithm.toSchema());
    outputArray.push(this.encryptedKey); //endregion 
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
    return {
      version: this.version,
      rid: this.rid.toJSON(),
      keyEncryptionAlgorithm: this.keyEncryptionAlgorithm.toJSON(),
      encryptedKey: this.encryptedKey.toJSON()
    };
  } //**********************************************************************************


} //**************************************************************************************


exports.default = KeyTransRecipientInfo;
//# sourceMappingURL=KeyTransRecipientInfo.js.map