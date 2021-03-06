"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var asn1js = _interopRequireWildcard(require("asn1js"));

var _pvutils = require("pvutils");

var _AlgorithmIdentifier = _interopRequireDefault(require("./AlgorithmIdentifier.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//**************************************************************************************

/**
 * Class from RFC5652
 */
class OriginatorPublicKey {
  //**********************************************************************************

  /**
   * Constructor for OriginatorPublicKey class
   * @param {Object} [parameters={}]
   * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
   */
  constructor(parameters = {}) {
    //region Internal properties of the object

    /**
     * @type {AlgorithmIdentifier}
     * @desc algorithm
     */
    this.algorithm = (0, _pvutils.getParametersValue)(parameters, "algorithm", OriginatorPublicKey.defaultValues("algorithm"));
    /**
     * @type {BitString}
     * @desc publicKey
     */

    this.publicKey = (0, _pvutils.getParametersValue)(parameters, "publicKey", OriginatorPublicKey.defaultValues("publicKey")); //endregion
    //region If input argument array contains "schema" for this object

    if ("schema" in parameters) this.fromSchema(parameters.schema); //endregion
  } //**********************************************************************************

  /**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


  static defaultValues(memberName) {
    switch (memberName) {
      case "algorithm":
        return new _AlgorithmIdentifier.default();

      case "publicKey":
        return new asn1js.BitString();

      default:
        throw new Error(`Invalid member name for OriginatorPublicKey class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Compare values with default values for all class members
   * @param {string} memberName String name for a class member
   * @param {*} memberValue Value to compare with default value
   */


  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case "algorithm":
      case "publicKey":
        return memberValue.isEqual(OriginatorPublicKey.defaultValues(memberName));

      default:
        throw new Error(`Invalid member name for OriginatorPublicKey class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Return value of pre-defined ASN.1 schema for current class
   *
   * ASN.1 schema:
   * ```asn1
   * OriginatorPublicKey ::= SEQUENCE {
   *    algorithm AlgorithmIdentifier,
   *    publicKey BIT STRING }
   * ```
   *
   * @param {Object} parameters Input parameters for the schema
   * @returns {Object} asn1js schema object
   */


  static schema(parameters = {}) {
    /**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [algorithm]
     * @property {string} [publicKey]
     */
    const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
    return new asn1js.Sequence({
      name: names.blockName || "",
      value: [_AlgorithmIdentifier.default.schema(names.algorithm || {}), new asn1js.BitString({
        name: names.publicKey || ""
      })]
    });
  } //**********************************************************************************

  /**
   * Convert parsed asn1js object into current class
   * @param {!Object} schema
   */


  fromSchema(schema) {
    //region Clear input data first
    (0, _pvutils.clearProps)(schema, ["algorithm", "publicKey"]); //endregion
    //region Check the schema is valid

    const asn1 = asn1js.compareSchema(schema, schema, OriginatorPublicKey.schema({
      names: {
        algorithm: {
          names: {
            blockName: "algorithm"
          }
        },
        publicKey: "publicKey"
      }
    }));
    if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for OriginatorPublicKey"); //endregion
    //region Get internal properties from parsed schema

    this.algorithm = new _AlgorithmIdentifier.default({
      schema: asn1.result.algorithm
    });
    this.publicKey = asn1.result.publicKey; //endregion
  } //**********************************************************************************

  /**
   * Convert current object to asn1js object and set correct values
   * @returns {Object} asn1js object
   */


  toSchema() {
    //region Construct and return new ASN.1 schema for this object
    return new asn1js.Sequence({
      value: [this.algorithm.toSchema(), this.publicKey]
    }); //endregion
  } //**********************************************************************************

  /**
   * Convertion for the class to JSON object
   * @returns {Object}
   */


  toJSON() {
    return {
      algorithm: this.algorithm.toJSON(),
      publicKey: this.publicKey.toJSON()
    };
  } //**********************************************************************************


} //**************************************************************************************


exports.default = OriginatorPublicKey;
//# sourceMappingURL=OriginatorPublicKey.js.map