"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var asn1js = _interopRequireWildcard(require("asn1js"));

var _pvutils = require("pvutils");

var _Extension = _interopRequireDefault(require("./Extension.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//**************************************************************************************

/**
 * Class from RFC5280
 */
class Extensions {
  //**********************************************************************************

  /**
   * Constructor for Extensions class
   * @param {Object} [parameters={}]
   * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
   */
  constructor(parameters = {}) {
    //region Internal properties of the object

    /**
     * @type {Array.<Extension>}
     * @desc type
     */
    this.extensions = (0, _pvutils.getParametersValue)(parameters, "extensions", Extensions.defaultValues("extensions")); //endregion
    //region If input argument array contains "schema" for this object

    if ("schema" in parameters) this.fromSchema(parameters.schema); //endregion
  } //**********************************************************************************

  /**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


  static defaultValues(memberName) {
    switch (memberName) {
      case "extensions":
        return [];

      default:
        throw new Error(`Invalid member name for Extensions class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Return value of pre-defined ASN.1 schema for current class
   *
   * ASN.1 schema:
   * ```asn1
   * Extensions  ::=  SEQUENCE SIZE (1..MAX) OF Extension
   * ```
   *
   * @param {Object} parameters Input parameters for the schema
   * @param {boolean} optional Flag that current schema should be optional
   * @returns {Object} asn1js schema object
   */


  static schema(parameters = {}, optional = false) {
    /**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [extensions]
     * @property {string} [extension]
     */
    const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
    return new asn1js.Sequence({
      optional,
      name: names.blockName || "",
      value: [new asn1js.Repeated({
        name: names.extensions || "",
        value: _Extension.default.schema(names.extension || {})
      })]
    });
  } //**********************************************************************************

  /**
   * Convert parsed asn1js object into current class
   * @param {!Object} schema
   */


  fromSchema(schema) {
    //region Clear input data first
    (0, _pvutils.clearProps)(schema, ["extensions"]); //endregion
    //region Check the schema is valid

    const asn1 = asn1js.compareSchema(schema, schema, Extensions.schema({
      names: {
        extensions: "extensions"
      }
    }));
    if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for Extensions"); //endregion
    //region Get internal properties from parsed schema

    this.extensions = Array.from(asn1.result.extensions, element => new _Extension.default({
      schema: element
    })); //endregion
  } //**********************************************************************************

  /**
   * Convert current object to asn1js object and set correct values
   * @returns {Object} asn1js object
   */


  toSchema() {
    //region Construct and return new ASN.1 schema for this object
    return new asn1js.Sequence({
      value: Array.from(this.extensions, element => element.toSchema())
    }); //endregion
  } //**********************************************************************************

  /**
   * Convertion for the class to JSON object
   * @returns {Object}
   */


  toJSON() {
    return {
      extensions: Array.from(this.extensions, element => element.toJSON())
    };
  } //**********************************************************************************


} //**************************************************************************************


exports.default = Extensions;
//# sourceMappingURL=Extensions.js.map