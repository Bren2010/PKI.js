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
class ContentInfo {
  //**********************************************************************************

  /**
   * Constructor for ContentInfo class
   * @param {Object} [parameters={}]
   * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
   */
  constructor(parameters = {}) {
    //region Internal properties of the object

    /**
     * @type {string}
     * @desc contentType
     */
    this.contentType = (0, _pvutils.getParametersValue)(parameters, "contentType", ContentInfo.defaultValues("contentType"));
    /**
     * @type {Any}
     * @desc content
     */

    this.content = (0, _pvutils.getParametersValue)(parameters, "content", ContentInfo.defaultValues("content")); //endregion
    //region If input argument array contains "schema" for this object

    if ("schema" in parameters) this.fromSchema(parameters.schema); //endregion
  } //**********************************************************************************

  /**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


  static defaultValues(memberName) {
    switch (memberName) {
      case "contentType":
        return "";

      case "content":
        return new asn1js.Any();

      default:
        throw new Error(`Invalid member name for ContentInfo class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Compare values with default values for all class members
   * @param {string} memberName String name for a class member
   * @param {*} memberValue Value to compare with default value
   */


  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case "contentType":
        return memberValue === "";

      case "content":
        return memberValue instanceof asn1js.Any;

      default:
        throw new Error(`Invalid member name for ContentInfo class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Return value of pre-defined ASN.1 schema for current class
   *
   * ASN.1 schema:
   * ```asn1
   * ContentInfo ::= SEQUENCE {
   *    contentType ContentType,
   *    content [0] EXPLICIT ANY DEFINED BY contentType }
   * ```
   *
   * @param {Object} parameters Input parameters for the schema
   * @returns {Object} asn1js schema object
   */


  static schema(parameters = {}) {
    /**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [contentType]
     * @property {string} [content]
     */
    const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
    if ("optional" in names === false) names.optional = false;
    return new asn1js.Sequence({
      name: names.blockName || "ContentInfo",
      optional: names.optional,
      value: [new asn1js.ObjectIdentifier({
        name: names.contentType || "contentType"
      }), new asn1js.Constructed({
        idBlock: {
          tagClass: 3,
          // CONTEXT-SPECIFIC
          tagNumber: 0 // [0]

        },
        value: [new asn1js.Any({
          name: names.content || "content"
        })] // EXPLICIT ANY value

      })]
    });
  } //**********************************************************************************

  /**
   * Convert parsed asn1js object into current class
   * @param {!Object} schema
   */


  fromSchema(schema) {
    //region Clear input data first
    (0, _pvutils.clearProps)(schema, ["contentType", "content"]); //endregion
    //region Check the schema is valid

    const asn1 = asn1js.compareSchema(schema, schema, ContentInfo.schema());
    if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for ContentInfo"); //endregion
    //region Get internal properties from parsed schema

    this.contentType = asn1.result.contentType.valueBlock.toString();
    this.content = asn1.result.content; //endregion
  } //**********************************************************************************

  /**
   * Convert current object to asn1js object and set correct values
   * @returns {Object} asn1js object
   */


  toSchema() {
    //region Construct and return new ASN.1 schema for this object
    return new asn1js.Sequence({
      value: [new asn1js.ObjectIdentifier({
        value: this.contentType
      }), new asn1js.Constructed({
        idBlock: {
          tagClass: 3,
          // CONTEXT-SPECIFIC
          tagNumber: 0 // [0]

        },
        value: [this.content] // EXPLICIT ANY value

      })]
    }); //endregion
  } //**********************************************************************************

  /**
   * Convertion for the class to JSON object
   * @returns {Object}
   */


  toJSON() {
    const object = {
      contentType: this.contentType
    };
    if (!(this.content instanceof asn1js.Any)) object.content = this.content.toJSON();
    return object;
  } //**********************************************************************************


} //**************************************************************************************


exports.default = ContentInfo;
//# sourceMappingURL=ContentInfo.js.map