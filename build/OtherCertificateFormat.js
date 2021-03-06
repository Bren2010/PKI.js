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
class OtherCertificateFormat {
  //**********************************************************************************

  /**
   * Constructor for OtherCertificateFormat class
   * @param {Object} [parameters={}]
   * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
   */
  constructor(parameters = {}) {
    //region Internal properties of the object

    /**
     * @type {string}
     * @desc otherCertFormat
     */
    this.otherCertFormat = (0, _pvutils.getParametersValue)(parameters, "otherCertFormat", OtherCertificateFormat.defaultValues("otherCertFormat"));
    /**
     * @type {Any}
     * @desc otherCert
     */

    this.otherCert = (0, _pvutils.getParametersValue)(parameters, "otherCert", OtherCertificateFormat.defaultValues("otherCert")); //endregion
    //region If input argument array contains "schema" for this object

    if ("schema" in parameters) this.fromSchema(parameters.schema); //endregion
  } //**********************************************************************************

  /**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


  static defaultValues(memberName) {
    switch (memberName) {
      case "otherCertFormat":
        return "";

      case "otherCert":
        return new asn1js.Any();

      default:
        throw new Error(`Invalid member name for OtherCertificateFormat class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Return value of pre-defined ASN.1 schema for current class
   *
   * ASN.1 schema:
   * ```asn1
   * OtherCertificateFormat ::= SEQUENCE {
   *    otherCertFormat OBJECT IDENTIFIER,
   *    otherCert ANY DEFINED BY otherCertFormat }
   * ```
   *
   * @param {Object} parameters Input parameters for the schema
   * @returns {Object} asn1js schema object
   */


  static schema(parameters = {}) {
    /**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [otherCertFormat]
     * @property {string} [otherCert]
     */
    const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
    return new asn1js.Sequence({
      name: names.blockName || "",
      value: [new asn1js.ObjectIdentifier({
        name: names.otherCertFormat || "otherCertFormat"
      }), new asn1js.Any({
        name: names.otherCert || "otherCert"
      })]
    });
  } //**********************************************************************************

  /**
   * Convert parsed asn1js object into current class
   * @param {!Object} schema
   */


  fromSchema(schema) {
    //region Clear input data first
    (0, _pvutils.clearProps)(schema, ["otherCertFormat", "otherCert"]); //endregion
    //region Check the schema is valid

    const asn1 = asn1js.compareSchema(schema, schema, OtherCertificateFormat.schema());
    if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for OtherCertificateFormat"); //endregion
    //region Get internal properties from parsed schema

    this.otherCertFormat = asn1.result.otherCertFormat.valueBlock.toString();
    this.otherCert = asn1.result.otherCert; //endregion
  } //**********************************************************************************

  /**
   * Convert current object to asn1js object and set correct values
   * @returns {Object} asn1js object
   */


  toSchema() {
    //region Construct and return new ASN.1 schema for this object
    return new asn1js.Sequence({
      value: [new asn1js.ObjectIdentifier({
        value: this.otherCertFormat
      }), this.otherCert]
    }); //endregion
  } //**********************************************************************************

  /**
   * Convertion for the class to JSON object
   * @returns {Object}
   */


  toJSON() {
    const object = {
      otherCertFormat: this.otherCertFormat
    };
    if (!(this.otherCert instanceof asn1js.Any)) object.otherCert = this.otherCert.toJSON();
    return object;
  } //**********************************************************************************


} //**************************************************************************************


exports.default = OtherCertificateFormat;
//# sourceMappingURL=OtherCertificateFormat.js.map