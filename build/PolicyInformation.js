"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var asn1js = _interopRequireWildcard(require("asn1js"));

var _pvutils = require("pvutils");

var _PolicyQualifierInfo = _interopRequireDefault(require("./PolicyQualifierInfo.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//**************************************************************************************

/**
 * Class from RFC5280
 */
class PolicyInformation {
  //**********************************************************************************

  /**
   * Constructor for PolicyInformation class
   * @param {Object} [parameters={}]
   * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
   */
  constructor(parameters = {}) {
    //region Internal properties of the object

    /**
     * @type {string}
     * @desc policyIdentifier
     */
    this.policyIdentifier = (0, _pvutils.getParametersValue)(parameters, "policyIdentifier", PolicyInformation.defaultValues("policyIdentifier"));
    if ("policyQualifiers" in parameters)
      /**
       * @type {Array.<PolicyQualifierInfo>}
       * @desc Value of the TIME class
       */
      this.policyQualifiers = (0, _pvutils.getParametersValue)(parameters, "policyQualifiers", PolicyInformation.defaultValues("policyQualifiers")); //endregion
    //region If input argument array contains "schema" for this object

    if ("schema" in parameters) this.fromSchema(parameters.schema); //endregion
  } //**********************************************************************************

  /**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


  static defaultValues(memberName) {
    switch (memberName) {
      case "policyIdentifier":
        return "";

      case "policyQualifiers":
        return [];

      default:
        throw new Error(`Invalid member name for PolicyInformation class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Return value of pre-defined ASN.1 schema for current class
   *
   * ASN.1 schema:
   * ```asn1
   * PolicyInformation ::= SEQUENCE {
   *    policyIdentifier   CertPolicyId,
   *    policyQualifiers   SEQUENCE SIZE (1..MAX) OF
   *    PolicyQualifierInfo OPTIONAL }
   *
   * CertPolicyId ::= OBJECT IDENTIFIER
   * ```
   *
   * @param {Object} parameters Input parameters for the schema
   * @returns {Object} asn1js schema object
   */


  static schema(parameters = {}) {
    /**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [policyIdentifier]
     * @property {string} [policyQualifiers]
     */
    const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
    return new asn1js.Sequence({
      name: names.blockName || "",
      value: [new asn1js.ObjectIdentifier({
        name: names.policyIdentifier || ""
      }), new asn1js.Sequence({
        optional: true,
        value: [new asn1js.Repeated({
          name: names.policyQualifiers || "",
          value: _PolicyQualifierInfo.default.schema()
        })]
      })]
    });
  } //**********************************************************************************

  /**
   * Convert parsed asn1js object into current class
   * @param {!Object} schema
   */


  fromSchema(schema) {
    //region Clear input data first
    (0, _pvutils.clearProps)(schema, ["policyIdentifier", "policyQualifiers"]); //endregion
    //region Check the schema is valid

    const asn1 = asn1js.compareSchema(schema, schema, PolicyInformation.schema({
      names: {
        policyIdentifier: "policyIdentifier",
        policyQualifiers: "policyQualifiers"
      }
    }));
    if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for PolicyInformation"); //endregion
    //region Get internal properties from parsed schema

    this.policyIdentifier = asn1.result.policyIdentifier.valueBlock.toString();
    if ("policyQualifiers" in asn1.result) this.policyQualifiers = Array.from(asn1.result.policyQualifiers, element => new _PolicyQualifierInfo.default({
      schema: element
    })); //endregion
  } //**********************************************************************************

  /**
   * Convert current object to asn1js object and set correct values
   * @returns {Object} asn1js object
   */


  toSchema() {
    //region Create array for output sequence
    const outputArray = [];
    outputArray.push(new asn1js.ObjectIdentifier({
      value: this.policyIdentifier
    }));

    if ("policyQualifiers" in this) {
      outputArray.push(new asn1js.Sequence({
        value: Array.from(this.policyQualifiers, element => element.toSchema())
      }));
    } //endregion
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
    const object = {
      policyIdentifier: this.policyIdentifier
    };
    if ("policyQualifiers" in this) object.policyQualifiers = Array.from(this.policyQualifiers, element => element.toJSON());
    return object;
  } //**********************************************************************************


} //**************************************************************************************


exports.default = PolicyInformation;
//# sourceMappingURL=PolicyInformation.js.map