"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var asn1js = _interopRequireWildcard(require("asn1js"));

var _pvutils = require("pvutils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//**************************************************************************************

/**
 * Class from RFC6960
 */
class ResponseBytes {
  //**********************************************************************************

  /**
   * Constructor for ResponseBytes class
   * @param {Object} [parameters={}]
   * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
   */
  constructor(parameters = {}) {
    //region Internal properties of the object

    /**
     * @type {string}
     * @desc responseType
     */
    this.responseType = (0, _pvutils.getParametersValue)(parameters, "responseType", ResponseBytes.defaultValues("responseType"));
    /**
     * @type {OctetString}
     * @desc response
     */

    this.response = (0, _pvutils.getParametersValue)(parameters, "response", ResponseBytes.defaultValues("response")); //endregion
    //region If input argument array contains "schema" for this object

    if ("schema" in parameters) this.fromSchema(parameters.schema); //endregion
  } //**********************************************************************************

  /**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


  static defaultValues(memberName) {
    switch (memberName) {
      case "responseType":
        return "";

      case "response":
        return new asn1js.OctetString();

      default:
        throw new Error(`Invalid member name for ResponseBytes class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Compare values with default values for all class members
   * @param {string} memberName String name for a class member
   * @param {*} memberValue Value to compare with default value
   */


  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case "responseType":
        return memberValue === "";

      case "response":
        return memberValue.isEqual(ResponseBytes.defaultValues(memberName));

      default:
        throw new Error(`Invalid member name for ResponseBytes class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Return value of pre-defined ASN.1 schema for current class
   *
   * ASN.1 schema:
   * ```asn1
   * ResponseBytes ::=       SEQUENCE {
   *    responseType   OBJECT IDENTIFIER,
   *    response       OCTET STRING }
   * ```
   *
   * @param {Object} parameters Input parameters for the schema
   * @returns {Object} asn1js schema object
   */


  static schema(parameters = {}) {
    /**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [responseType]
     * @property {string} [response]
     */
    const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
    return new asn1js.Sequence({
      name: names.blockName || "",
      value: [new asn1js.ObjectIdentifier({
        name: names.responseType || ""
      }), new asn1js.OctetString({
        name: names.response || ""
      })]
    });
  } //**********************************************************************************

  /**
   * Convert parsed asn1js object into current class
   * @param {!Object} schema
   */


  fromSchema(schema) {
    //region Clear input data first
    (0, _pvutils.clearProps)(schema, ["responseType", "response"]); //endregion
    //region Check the schema is valid

    const asn1 = asn1js.compareSchema(schema, schema, ResponseBytes.schema({
      names: {
        responseType: "responseType",
        response: "response"
      }
    }));
    if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for ResponseBytes"); //endregion
    //region Get internal properties from parsed schema

    this.responseType = asn1.result.responseType.valueBlock.toString();
    this.response = asn1.result.response; //endregion
  } //**********************************************************************************

  /**
   * Convert current object to asn1js object and set correct values
   * @returns {Object} asn1js object
   */


  toSchema() {
    //region Construct and return new ASN.1 schema for this object
    return new asn1js.Sequence({
      value: [new asn1js.ObjectIdentifier({
        value: this.responseType
      }), this.response]
    }); //endregion
  } //**********************************************************************************

  /**
   * Convertion for the class to JSON object
   * @returns {Object}
   */


  toJSON() {
    return {
      responseType: this.responseType,
      response: this.response.toJSON()
    };
  } //**********************************************************************************


} //**************************************************************************************


exports.default = ResponseBytes;
//# sourceMappingURL=ResponseBytes.js.map