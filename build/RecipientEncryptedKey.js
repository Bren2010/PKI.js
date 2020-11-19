"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var asn1js = _interopRequireWildcard(require("asn1js"));

var _pvutils = require("pvutils");

var _KeyAgreeRecipientIdentifier = _interopRequireDefault(require("./KeyAgreeRecipientIdentifier.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//**************************************************************************************

/**
 * Class from RFC5652
 */
class RecipientEncryptedKey {
  //**********************************************************************************

  /**
   * Constructor for RecipientEncryptedKey class
   * @param {Object} [parameters={}]
   * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
   */
  constructor(parameters = {}) {
    //region Internal properties of the object

    /**
     * @type {KeyAgreeRecipientIdentifier}
     * @desc rid
     */
    this.rid = (0, _pvutils.getParametersValue)(parameters, "rid", RecipientEncryptedKey.defaultValues("rid"));
    /**
     * @type {OctetString}
     * @desc encryptedKey
     */

    this.encryptedKey = (0, _pvutils.getParametersValue)(parameters, "encryptedKey", RecipientEncryptedKey.defaultValues("encryptedKey")); //endregion
    //region If input argument array contains "schema" for this object

    if ("schema" in parameters) this.fromSchema(parameters.schema); //endregion
  } //**********************************************************************************

  /**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


  static defaultValues(memberName) {
    switch (memberName) {
      case "rid":
        return new _KeyAgreeRecipientIdentifier.default();

      case "encryptedKey":
        return new asn1js.OctetString();

      default:
        throw new Error(`Invalid member name for RecipientEncryptedKey class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Compare values with default values for all class members
   * @param {string} memberName String name for a class member
   * @param {*} memberValue Value to compare with default value
   */


  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case "rid":
        return memberValue.variant === -1 && "value" in memberValue === false;

      case "encryptedKey":
        return memberValue.isEqual(RecipientEncryptedKey.defaultValues("encryptedKey"));

      default:
        throw new Error(`Invalid member name for RecipientEncryptedKey class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Return value of pre-defined ASN.1 schema for current class
   *
   * ASN.1 schema:
   * ```asn1
   * RecipientEncryptedKey ::= SEQUENCE {
   *    rid KeyAgreeRecipientIdentifier,
   *    encryptedKey EncryptedKey }
   *
   * EncryptedKey ::= OCTET STRING
   * ```
   *
   * @param {Object} parameters Input parameters for the schema
   * @returns {Object} asn1js schema object
   */


  static schema(parameters = {}) {
    /**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [rid]
     * @property {string} [encryptedKey]
     */
    const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
    return new asn1js.Sequence({
      name: names.blockName || "",
      value: [_KeyAgreeRecipientIdentifier.default.schema(names.rid || {}), new asn1js.OctetString({
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
    (0, _pvutils.clearProps)(schema, ["rid", "encryptedKey"]); //endregion
    //region Check the schema is valid

    const asn1 = asn1js.compareSchema(schema, schema, RecipientEncryptedKey.schema({
      names: {
        rid: {
          names: {
            blockName: "rid"
          }
        },
        encryptedKey: "encryptedKey"
      }
    }));
    if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for RecipientEncryptedKey"); //endregion
    //region Get internal properties from parsed schema

    this.rid = new _KeyAgreeRecipientIdentifier.default({
      schema: asn1.result.rid
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
      value: [this.rid.toSchema(), this.encryptedKey]
    }); //endregion
  } //**********************************************************************************

  /**
   * Convertion for the class to JSON object
   * @returns {Object}
   */


  toJSON() {
    return {
      rid: this.rid.toJSON(),
      encryptedKey: this.encryptedKey.toJSON()
    };
  } //**********************************************************************************


} //**************************************************************************************


exports.default = RecipientEncryptedKey;
//# sourceMappingURL=RecipientEncryptedKey.js.map