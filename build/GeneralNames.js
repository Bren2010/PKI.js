"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var asn1js = _interopRequireWildcard(require("asn1js"));

var _pvutils = require("pvutils");

var _GeneralName = _interopRequireDefault(require("./GeneralName.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//**************************************************************************************

/**
 * Class from RFC5280
 */
class GeneralNames {
  //**********************************************************************************

  /**
   * Constructor for GeneralNames class
   * @param {Object} [parameters={}]
   * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
   */
  constructor(parameters = {}) {
    //region Internal properties of the object

    /**
     * @type {Array.<GeneralName>}
     * @desc Array of "general names"
     */
    this.names = (0, _pvutils.getParametersValue)(parameters, "names", GeneralNames.defaultValues("names")); //endregion
    //region If input argument array contains "schema" for this object

    if ("schema" in parameters) this.fromSchema(parameters.schema); //endregion
  } //**********************************************************************************

  /**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


  static defaultValues(memberName) {
    switch (memberName) {
      case "names":
        return [];

      default:
        throw new Error(`Invalid member name for GeneralNames class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Return value of pre-defined ASN.1 schema for current class
   *
   * ASN.1 schema:
   * ```asn1
   * GeneralNames ::= SEQUENCE SIZE (1..MAX) OF GeneralName
   * ```
   *
   * @param {Object} parameters Input parameters for the schema
   * @param {boolean} [optional=false] Flag would be element optional or not
   * @returns {Object} asn1js schema object
   */


  static schema(parameters = {}, optional = false) {
    /**
     * @type {Object}
     * @property {string} utcTimeName Name for "utcTimeName" choice
     * @property {string} generalTimeName Name for "generalTimeName" choice
     */
    const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
    return new asn1js.Sequence({
      optional,
      name: names.blockName || "",
      value: [new asn1js.Repeated({
        name: names.generalNames || "",
        value: _GeneralName.default.schema()
      })]
    });
  } //**********************************************************************************

  /**
   * Convert parsed asn1js object into current class
   * @param {!Object} schema
   */


  fromSchema(schema) {
    //region Clear input data first
    (0, _pvutils.clearProps)(schema, ["names", "generalNames"]); //endregion
    //region Check the schema is valid

    const asn1 = asn1js.compareSchema(schema, schema, GeneralNames.schema({
      names: {
        blockName: "names",
        generalNames: "generalNames"
      }
    }));
    if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for GeneralNames"); //endregion
    //region Get internal properties from parsed schema

    this.names = Array.from(asn1.result.generalNames, element => new _GeneralName.default({
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
      value: Array.from(this.names, element => element.toSchema())
    }); //endregion
  } //**********************************************************************************

  /**
   * Convertion for the class to JSON object
   * @returns {Object}
   */


  toJSON() {
    return {
      names: Array.from(this.names, element => element.toJSON())
    };
  } //**********************************************************************************


} //**************************************************************************************


exports.default = GeneralNames;
//# sourceMappingURL=GeneralNames.js.map