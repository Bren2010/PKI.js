"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var asn1js = _interopRequireWildcard(require("asn1js"));

var _pvutils = require("pvutils");

var _KEKIdentifier = _interopRequireDefault(require("./KEKIdentifier.js"));

var _AlgorithmIdentifier = _interopRequireDefault(require("./AlgorithmIdentifier.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//**************************************************************************************

/**
 * Class from RFC5652
 */
class KEKRecipientInfo {
  //**********************************************************************************

  /**
   * Constructor for KEKRecipientInfo class
   * @param {Object} [parameters={}]
   * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
   */
  constructor(parameters = {}) {
    //region Internal properties of the object

    /**
     * @type {number}
     * @desc version
     */
    this.version = (0, _pvutils.getParametersValue)(parameters, "version", KEKRecipientInfo.defaultValues("version"));
    /**
     * @type {KEKIdentifier}
     * @desc kekid
     */

    this.kekid = (0, _pvutils.getParametersValue)(parameters, "kekid", KEKRecipientInfo.defaultValues("kekid"));
    /**
     * @type {AlgorithmIdentifier}
     * @desc keyEncryptionAlgorithm
     */

    this.keyEncryptionAlgorithm = (0, _pvutils.getParametersValue)(parameters, "keyEncryptionAlgorithm", KEKRecipientInfo.defaultValues("keyEncryptionAlgorithm"));
    /**
     * @type {OctetString}
     * @desc encryptedKey
     */

    this.encryptedKey = (0, _pvutils.getParametersValue)(parameters, "encryptedKey", KEKRecipientInfo.defaultValues("encryptedKey"));
    /**
     * @type {ArrayBuffer}
     * @desc preDefinedKEK KEK using to encrypt CEK
     */

    this.preDefinedKEK = (0, _pvutils.getParametersValue)(parameters, "preDefinedKEK", KEKRecipientInfo.defaultValues("preDefinedKEK")); //endregion
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
        return 0;

      case "kekid":
        return new _KEKIdentifier.default();

      case "keyEncryptionAlgorithm":
        return new _AlgorithmIdentifier.default();

      case "encryptedKey":
        return new asn1js.OctetString();

      case "preDefinedKEK":
        return new ArrayBuffer(0);

      default:
        throw new Error(`Invalid member name for KEKRecipientInfo class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Compare values with default values for all class members
   * @param {string} memberName String name for a class member
   * @param {*} memberValue Value to compare with default value
   */


  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case "KEKRecipientInfo":
        return memberValue === KEKRecipientInfo.defaultValues("version");

      case "kekid":
        return memberValue.compareWithDefault("keyIdentifier", memberValue.keyIdentifier) && "date" in memberValue === false && "other" in memberValue === false;

      case "keyEncryptionAlgorithm":
        return memberValue.algorithmId === "" && "algorithmParams" in memberValue === false;

      case "encryptedKey":
        return memberValue.isEqual(KEKRecipientInfo.defaultValues("encryptedKey"));

      case "preDefinedKEK":
        return memberValue.byteLength === 0;

      default:
        throw new Error(`Invalid member name for KEKRecipientInfo class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Return value of pre-defined ASN.1 schema for current class
   *
   * ASN.1 schema:
   * ```asn1
   * KEKRecipientInfo ::= SEQUENCE {
   *    version CMSVersion,  -- always set to 4
   *    kekid KEKIdentifier,
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
     * @property {string} [kekid]
     * @property {string} [keyEncryptionAlgorithm]
     * @property {string} [encryptedKey]
     */
    const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
    return new asn1js.Sequence({
      name: names.blockName || "",
      value: [new asn1js.Integer({
        name: names.version || ""
      }), _KEKIdentifier.default.schema(names.kekid || {}), _AlgorithmIdentifier.default.schema(names.keyEncryptionAlgorithm || {}), new asn1js.OctetString({
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
    (0, _pvutils.clearProps)(schema, ["version", "kekid", "keyEncryptionAlgorithm", "encryptedKey"]); //endregion
    //region Check the schema is valid

    const asn1 = asn1js.compareSchema(schema, schema, KEKRecipientInfo.schema({
      names: {
        version: "version",
        kekid: {
          names: {
            blockName: "kekid"
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
    if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for KEKRecipientInfo"); //endregion
    //region Get internal properties from parsed schema

    this.version = asn1.result.version.valueBlock.valueDec;
    this.kekid = new _KEKIdentifier.default({
      schema: asn1.result.kekid
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
    //region Construct and return new ASN.1 schema for this object
    return new asn1js.Sequence({
      value: [new asn1js.Integer({
        value: this.version
      }), this.kekid.toSchema(), this.keyEncryptionAlgorithm.toSchema(), this.encryptedKey]
    }); //endregion
  } //**********************************************************************************

  /**
   * Convertion for the class to JSON object
   * @returns {Object}
   */


  toJSON() {
    return {
      version: this.version,
      kekid: this.kekid.toJSON(),
      keyEncryptionAlgorithm: this.keyEncryptionAlgorithm.toJSON(),
      encryptedKey: this.encryptedKey.toJSON()
    };
  } //**********************************************************************************


} //**************************************************************************************


exports.default = KEKRecipientInfo;
//# sourceMappingURL=KEKRecipientInfo.js.map