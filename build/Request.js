"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var asn1js = _interopRequireWildcard(require("asn1js"));

var _pvutils = require("pvutils");

var _CertID = _interopRequireDefault(require("./CertID.js"));

var _Extension = _interopRequireDefault(require("./Extension.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//**************************************************************************************

/**
 * Class from RFC6960
 */
class Request {
  //**********************************************************************************

  /**
   * Constructor for Request class
   * @param {Object} [parameters={}]
   * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
   */
  constructor(parameters = {}) {
    //region Internal properties of the object

    /**
     * @type {CertID}
     * @desc reqCert
     */
    this.reqCert = (0, _pvutils.getParametersValue)(parameters, "reqCert", Request.defaultValues("reqCert"));
    if ("singleRequestExtensions" in parameters)
      /**
       * @type {Array.<Extension>}
       * @desc singleRequestExtensions
       */
      this.singleRequestExtensions = (0, _pvutils.getParametersValue)(parameters, "singleRequestExtensions", Request.defaultValues("singleRequestExtensions")); //endregion
    //region If input argument array contains "schema" for this object

    if ("schema" in parameters) this.fromSchema(parameters.schema); //endregion
  } //**********************************************************************************

  /**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


  static defaultValues(memberName) {
    switch (memberName) {
      case "reqCert":
        return new _CertID.default();

      case "singleRequestExtensions":
        return [];

      default:
        throw new Error(`Invalid member name for Request class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Compare values with default values for all class members
   * @param {string} memberName String name for a class member
   * @param {*} memberValue Value to compare with default value
   */


  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case "reqCert":
        return memberValue.isEqual(Request.defaultValues(memberName));

      case "singleRequestExtensions":
        return memberValue.length === 0;

      default:
        throw new Error(`Invalid member name for Request class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Return value of pre-defined ASN.1 schema for current class
   *
   * ASN.1 schema:
   * ```asn1
   * Request         ::=     SEQUENCE {
   *    reqCert                     CertID,
   *    singleRequestExtensions     [0] EXPLICIT Extensions OPTIONAL }
   * ```
   *
   * @param {Object} parameters Input parameters for the schema
   * @returns {Object} asn1js schema object
   */


  static schema(parameters = {}) {
    /**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [reqCert]
     * @property {string} [extensions]
     * @property {string} [singleRequestExtensions]
     */
    const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
    return new asn1js.Sequence({
      name: names.blockName || "",
      value: [_CertID.default.schema(names.reqCert || {}), new asn1js.Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          // CONTEXT-SPECIFIC
          tagNumber: 0 // [0]

        },
        value: [_Extension.default.schema(names.extensions || {
          names: {
            blockName: names.singleRequestExtensions || ""
          }
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
    (0, _pvutils.clearProps)(schema, ["reqCert", "singleRequestExtensions"]); //endregion
    //region Check the schema is valid

    const asn1 = asn1js.compareSchema(schema, schema, Request.schema({
      names: {
        reqCert: {
          names: {
            blockName: "reqCert"
          }
        },
        singleRequestExtensions: {
          names: {
            blockName: "singleRequestExtensions"
          }
        }
      }
    }));
    if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for Request"); //endregion
    //region Get internal properties from parsed schema

    this.reqCert = new _CertID.default({
      schema: asn1.result.reqCert
    });
    if ("singleRequestExtensions" in asn1.result) this.singleRequestExtensions = Array.from(asn1.result.singleRequestExtensions.valueBlock.value, element => new _Extension.default({
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
    outputArray.push(this.reqCert.toSchema());

    if ("singleRequestExtensions" in this) {
      outputArray.push(new asn1js.Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          // CONTEXT-SPECIFIC
          tagNumber: 0 // [0]

        },
        value: [new asn1js.Sequence({
          value: Array.from(this.singleRequestExtensions, element => element.toSchema())
        })]
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
    const _object = {
      reqCert: this.reqCert.toJSON()
    };
    if ("singleRequestExtensions" in this) _object.singleRequestExtensions = Array.from(this.singleRequestExtensions, element => element.toJSON());
    return _object;
  } //**********************************************************************************


} //**************************************************************************************


exports.default = Request;
//# sourceMappingURL=Request.js.map