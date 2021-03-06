"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var asn1js = _interopRequireWildcard(require("asn1js"));

var _pvutils = require("pvutils");

var _common = require("./common.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

//**************************************************************************************

/**
 * Class from RFC5280
 */
class AttributeTypeAndValue {
  //**********************************************************************************

  /**
   * Constructor for AttributeTypeAndValue class
   * @param {Object} [parameters={}]
   * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
   */
  constructor(parameters = {}) {
    //region Internal properties of the object

    /**
     * @type {string}
     * @desc type
     */
    this.type = (0, _pvutils.getParametersValue)(parameters, "type", AttributeTypeAndValue.defaultValues("type"));
    /**
     * @type {Object}
     * @desc Value of the AttributeTypeAndValue class
     */

    this.value = (0, _pvutils.getParametersValue)(parameters, "value", AttributeTypeAndValue.defaultValues("value")); //endregion
    //region If input argument array contains "schema" for this object

    if ("schema" in parameters) this.fromSchema(parameters.schema); //endregion
  } //**********************************************************************************

  /**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


  static defaultValues(memberName) {
    switch (memberName) {
      case "type":
        return "";

      case "value":
        return {};

      default:
        throw new Error(`Invalid member name for AttributeTypeAndValue class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Return value of pre-defined ASN.1 schema for current class
   *
   * ASN.1 schema:
   * ```asn1
   * AttributeTypeAndValue ::= Sequence {
   *    type     AttributeType,
   *    value    AttributeValue }
   *
   * AttributeType ::= OBJECT IDENTIFIER
   *
   * AttributeValue ::= ANY -- DEFINED BY AttributeType
   * ```
   *
   * @param {Object} parameters Input parameters for the schema
   * @returns {Object} asn1js schema object
   */


  static schema(parameters = {}) {
    /**
     * @type {Object}
     * @property {string} [blockName] Name for entire block
     * @property {string} [type] Name for "type" element
     * @property {string} [value] Name for "value" element
     */
    const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
    return new asn1js.Sequence({
      name: names.blockName || "",
      value: [new asn1js.ObjectIdentifier({
        name: names.type || ""
      }), new asn1js.Any({
        name: names.value || ""
      })]
    });
  } //**********************************************************************************


  static blockName() {
    return "AttributeTypeAndValue";
  } //**********************************************************************************

  /**
   * Convert parsed asn1js object into current class
   * @param {!Object} schema
   */


  fromSchema(schema) {
    //region Clear input data first
    (0, _pvutils.clearProps)(schema, ["type", "typeValue"]); //endregion
    //region Check the schema is valid

    const asn1 = asn1js.compareSchema(schema, schema, AttributeTypeAndValue.schema({
      names: {
        type: "type",
        value: "typeValue"
      }
    }));
    if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for AttributeTypeAndValue"); //endregion
    //region Get internal properties from parsed schema

    this.type = asn1.result.type.valueBlock.toString(); // noinspection JSUnresolvedVariable

    this.value = asn1.result.typeValue; //endregion
  } //**********************************************************************************

  /**
   * Convert current object to asn1js object and set correct values
   * @returns {Object} asn1js object
   */


  toSchema() {
    //region Construct and return new ASN.1 schema for this object
    return new asn1js.Sequence({
      value: [new asn1js.ObjectIdentifier({
        value: this.type
      }), this.value]
    }); //endregion
  } //**********************************************************************************

  /**
   * Convertion for the class to JSON object
   * @returns {Object}
   */


  toJSON() {
    const _object = {
      type: this.type
    };
    if (Object.keys(this.value).length !== 0) _object.value = this.value.toJSON();else _object.value = this.value;
    return _object;
  } //**********************************************************************************

  /**
   * Compare two AttributeTypeAndValue values, or AttributeTypeAndValue with ArrayBuffer value
   * @param {(AttributeTypeAndValue|ArrayBuffer)} compareTo The value compare to current
   * @returns {boolean}
   */


  isEqual(compareTo) {
    const stringBlockNames = [asn1js.Utf8String.blockName(), asn1js.BmpString.blockName(), asn1js.UniversalString.blockName(), asn1js.NumericString.blockName(), asn1js.PrintableString.blockName(), asn1js.TeletexString.blockName(), asn1js.VideotexString.blockName(), asn1js.IA5String.blockName(), asn1js.GraphicString.blockName(), asn1js.VisibleString.blockName(), asn1js.GeneralString.blockName(), asn1js.CharacterString.blockName()];

    if (compareTo.constructor.blockName() === AttributeTypeAndValue.blockName()) {
      if (this.type !== compareTo.type) return false; //region Check we do have both strings

      let isString = false;
      const thisName = this.value.constructor.blockName();

      if (thisName === compareTo.value.constructor.blockName()) {
        var _iterator = _createForOfIteratorHelper(stringBlockNames),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            const name = _step.value;

            if (thisName === name) {
              isString = true;
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } //endregion


      if (isString) {
        const value1 = (0, _common.stringPrep)(this.value.valueBlock.value);
        const value2 = (0, _common.stringPrep)(compareTo.value.valueBlock.value);
        if (value1.localeCompare(value2) !== 0) return false;
      } else // Comparing as two ArrayBuffers
        {
          if ((0, _pvutils.isEqualBuffer)(this.value.valueBeforeDecode, compareTo.value.valueBeforeDecode) === false) return false;
        }

      return true;
    }

    if (compareTo instanceof ArrayBuffer) return (0, _pvutils.isEqualBuffer)(this.value.valueBeforeDecode, compareTo);
    return false;
  } //**********************************************************************************


} //**************************************************************************************


exports.default = AttributeTypeAndValue;
//# sourceMappingURL=AttributeTypeAndValue.js.map