"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var asn1js = _interopRequireWildcard(require("asn1js"));

var _pvutils = require("pvutils");

var _CertificateRevocationList = _interopRequireDefault(require("./CertificateRevocationList.js"));

var _OtherRevocationInfoFormat = _interopRequireDefault(require("./OtherRevocationInfoFormat.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

//**************************************************************************************

/**
 * Class from RFC5652
 */
class RevocationInfoChoices {
  //**********************************************************************************

  /**
   * Constructor for RevocationInfoChoices class
   * @param {Object} [parameters={}]
   * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
   */
  constructor(parameters = {}) {
    //region Internal properties of the object

    /**
     * @type {Array.<CertificateRevocationList>}
     * @desc crls
     */
    this.crls = (0, _pvutils.getParametersValue)(parameters, "crls", RevocationInfoChoices.defaultValues("crls"));
    /**
     * @type {Array.<OtherRevocationInfoFormat>}
     * @desc otherRevocationInfos
     */

    this.otherRevocationInfos = (0, _pvutils.getParametersValue)(parameters, "otherRevocationInfos", RevocationInfoChoices.defaultValues("otherRevocationInfos")); //endregion
    //region If input argument array contains "schema" for this object

    if ("schema" in parameters) this.fromSchema(parameters.schema); //endregion
  } //**********************************************************************************

  /**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


  static defaultValues(memberName) {
    switch (memberName) {
      case "crls":
        return [];

      case "otherRevocationInfos":
        return [];

      default:
        throw new Error(`Invalid member name for RevocationInfoChoices class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Return value of pre-defined ASN.1 schema for current class
   *
   * ASN.1 schema:
   * ```asn1
   * RevocationInfoChoices ::= SET OF RevocationInfoChoice
   *
   * RevocationInfoChoice ::= CHOICE {
   *    crl CertificateList,
   *    other [1] IMPLICIT OtherRevocationInfoFormat }
   * ```
   *
   * @param {Object} parameters Input parameters for the schema
   * @returns {Object} asn1js schema object
   */


  static schema(parameters = {}) {
    /**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [crls]
     */
    const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
    return new asn1js.Set({
      name: names.blockName || "",
      value: [new asn1js.Repeated({
        name: names.crls || "",
        value: new asn1js.Choice({
          value: [_CertificateRevocationList.default.schema(), new asn1js.Constructed({
            idBlock: {
              tagClass: 3,
              // CONTEXT-SPECIFIC
              tagNumber: 1 // [1]

            },
            value: [new asn1js.ObjectIdentifier(), new asn1js.Any()]
          })]
        })
      })]
    });
  } //**********************************************************************************

  /**
   * Convert parsed asn1js object into current class
   * @param {!Object} schema
   */


  fromSchema(schema) {
    //region Clear input data first
    (0, _pvutils.clearProps)(schema, ["crls"]); //endregion
    //region Check the schema is valid

    const asn1 = asn1js.compareSchema(schema, schema, RevocationInfoChoices.schema({
      names: {
        crls: "crls"
      }
    }));
    if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for RevocationInfoChoices"); //endregion
    //region Get internal properties from parsed schema

    var _iterator = _createForOfIteratorHelper(asn1.result.crls),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        const element = _step.value;
        if (element.idBlock.tagClass === 1) this.crls.push(new _CertificateRevocationList.default({
          schema: element
        }));else this.otherRevocationInfos.push(new _OtherRevocationInfoFormat.default({
          schema: element
        }));
      } //endregion

    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } //**********************************************************************************

  /**
   * Convert current object to asn1js object and set correct values
   * @returns {Object} asn1js object
   */


  toSchema() {
    //region Create array for output set
    const outputArray = [];
    outputArray.push(...Array.from(this.crls, element => element.toSchema()));
    outputArray.push(...Array.from(this.otherRevocationInfos, element => {
      const schema = element.toSchema();
      schema.idBlock.tagClass = 3;
      schema.idBlock.tagNumber = 1;
      return schema;
    })); //endregion
    //region Construct and return new ASN.1 schema for this object

    return new asn1js.Set({
      value: outputArray
    }); //endregion
  } //**********************************************************************************

  /**
   * Convertion for the class to JSON object
   * @returns {Object}
   */


  toJSON() {
    return {
      crls: Array.from(this.crls, element => element.toJSON()),
      otherRevocationInfos: Array.from(this.otherRevocationInfos, element => element.toJSON())
    };
  } //**********************************************************************************


} //**************************************************************************************


exports.default = RevocationInfoChoices;
//# sourceMappingURL=RevocationInfoChoices.js.map