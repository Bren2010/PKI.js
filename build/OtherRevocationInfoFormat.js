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
 * Class from RFC5652
 */
class OtherRevocationInfoFormat {
  //**********************************************************************************

  /**
   * Constructor for OtherRevocationInfoFormat class
   * @param {Object} [parameters={}]
   * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
   */
  constructor(parameters = {}) {
    //region Internal properties of the object

    /**
     * @type {string}
     * @desc otherRevInfoFormat
     */
    this.otherRevInfoFormat = (0, _pvutils.getParametersValue)(parameters, "otherRevInfoFormat", OtherRevocationInfoFormat.defaultValues("otherRevInfoFormat"));
    /**
     * @type {Any}
     * @desc otherRevInfo
     */

    this.otherRevInfo = (0, _pvutils.getParametersValue)(parameters, "otherRevInfo", OtherRevocationInfoFormat.defaultValues("otherRevInfo")); //endregion
    //region If input argument array contains "schema" for this object

    if ("schema" in parameters) this.fromSchema(parameters.schema); //endregion
  } //**********************************************************************************

  /**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


  static defaultValues(memberName) {
    switch (memberName) {
      case "otherRevInfoFormat":
        return "";

      case "otherRevInfo":
        return new asn1js.Any();

      default:
        throw new Error(`Invalid member name for OtherRevocationInfoFormat class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Return value of pre-defined ASN.1 schema for current class
   *
   * ASN.1 schema:
   * ```asn1
   * OtherCertificateFormat ::= SEQUENCE {
   *    otherRevInfoFormat OBJECT IDENTIFIER,
   *    otherRevInfo ANY DEFINED BY otherCertFormat }
   * ```
   *
   * @param {Object} parameters Input parameters for the schema
   * @returns {Object} asn1js schema object
   */


  static schema(parameters = {}) {
    /**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [otherRevInfoFormat]
     * @property {string} [otherRevInfo]
     */
    const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
    return new asn1js.Sequence({
      name: names.blockName || "",
      value: [new asn1js.ObjectIdentifier({
        name: names.otherRevInfoFormat || "otherRevInfoFormat"
      }), new asn1js.Any({
        name: names.otherRevInfo || "otherRevInfo"
      })]
    });
  } //**********************************************************************************

  /**
   * Convert parsed asn1js object into current class
   * @param {!Object} schema
   */


  fromSchema(schema) {
    //region Clear input data first
    (0, _pvutils.clearProps)(schema, ["otherRevInfoFormat", "otherRevInfo"]); //endregion
    //region Check the schema is valid

    const asn1 = asn1js.compareSchema(schema, schema, OtherRevocationInfoFormat.schema());
    if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for OtherRevocationInfoFormat"); //endregion
    //region Get internal properties from parsed schema

    this.otherRevInfoFormat = asn1.result.otherRevInfoFormat.valueBlock.toString();
    this.otherRevInfo = asn1.result.otherRevInfo; //endregion
  } //**********************************************************************************

  /**
   * Convert current object to asn1js object and set correct values
   * @returns {Object} asn1js object
   */


  toSchema() {
    //region Construct and return new ASN.1 schema for this object
    return new asn1js.Sequence({
      value: [new asn1js.ObjectIdentifier({
        value: this.otherRevInfoFormat
      }), this.otherRevInfo]
    }); //endregion
  } //**********************************************************************************

  /**
   * Convertion for the class to JSON object
   * @returns {Object}
   */


  toJSON() {
    const object = {
      otherRevInfoFormat: this.otherRevInfoFormat
    };
    if (!(this.otherRevInfo instanceof asn1js.Any)) object.otherRevInfo = this.otherRevInfo.toJSON();
    return object;
  } //**********************************************************************************


} //**************************************************************************************


exports.default = OtherRevocationInfoFormat;
//# sourceMappingURL=OtherRevocationInfoFormat.js.map