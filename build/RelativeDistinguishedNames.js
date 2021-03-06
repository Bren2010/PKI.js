"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var asn1js = _interopRequireWildcard(require("asn1js"));

var _pvutils = require("pvutils");

var _AttributeTypeAndValue = _interopRequireDefault(require("./AttributeTypeAndValue.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

//**************************************************************************************

/**
 * Class from RFC5280
 */
class RelativeDistinguishedNames {
  //**********************************************************************************

  /**
   * Constructor for RelativeDistinguishedNames class
   * @param {Object} [parameters={}]
   * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
   * @property {Array.<AttributeTypeAndValue>} [typesAndValues] Array of "type and value" objects
   * @property {ArrayBuffer} [valueBeforeDecode] Value of the RDN before decoding from schema
   */
  constructor(parameters = {}) {
    //region Internal properties of the object

    /**
     * @type {Array.<AttributeTypeAndValue>}
     * @desc Array of "type and value" objects
     */
    this.typesAndValues = (0, _pvutils.getParametersValue)(parameters, "typesAndValues", RelativeDistinguishedNames.defaultValues("typesAndValues"));
    /**
     * @type {ArrayBuffer}
     * @desc Value of the RDN before decoding from schema
     */

    this.valueBeforeDecode = (0, _pvutils.getParametersValue)(parameters, "valueBeforeDecode", RelativeDistinguishedNames.defaultValues("valueBeforeDecode")); //endregion
    //region If input argument array contains "schema" for this object

    if ("schema" in parameters) this.fromSchema(parameters.schema); //endregion
  } //**********************************************************************************

  /**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


  static defaultValues(memberName) {
    switch (memberName) {
      case "typesAndValues":
        return [];

      case "valueBeforeDecode":
        return new ArrayBuffer(0);

      default:
        throw new Error(`Invalid member name for RelativeDistinguishedNames class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Compare values with default values for all class members
   * @param {string} memberName String name for a class member
   * @param {*} memberValue Value to compare with default value
   */


  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case "typesAndValues":
        return memberValue.length === 0;

      case "valueBeforeDecode":
        return memberValue.byteLength === 0;

      default:
        throw new Error(`Invalid member name for RelativeDistinguishedNames class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Return value of pre-defined ASN.1 schema for current class
   *
   * ASN.1 schema:
   * ```asn1
   * RDNSequence ::= Sequence OF RelativeDistinguishedName
   *
   * RelativeDistinguishedName ::=
   * SET SIZE (1..MAX) OF AttributeTypeAndValue
   * ```
   *
   * @param {Object} parameters Input parameters for the schema
   * @returns {Object} asn1js schema object
   */


  static schema(parameters = {}) {
    /**
     * @type {Object}
     * @property {string} [blockName] Name for entire block
     * @property {string} [repeatedSequence] Name for "repeatedSequence" block
     * @property {string} [repeatedSet] Name for "repeatedSet" block
     * @property {string} [typeAndValue] Name for "typeAndValue" block
     */
    const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
    return new asn1js.Sequence({
      name: names.blockName || "",
      value: [new asn1js.Repeated({
        name: names.repeatedSequence || "",
        value: new asn1js.Set({
          value: [new asn1js.Repeated({
            name: names.repeatedSet || "",
            value: _AttributeTypeAndValue.default.schema(names.typeAndValue || {})
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
    (0, _pvutils.clearProps)(schema, ["RDN", "typesAndValues"]); //endregion
    //region Check the schema is valid

    const asn1 = asn1js.compareSchema(schema, schema, RelativeDistinguishedNames.schema({
      names: {
        blockName: "RDN",
        repeatedSet: "typesAndValues"
      }
    }));
    if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for RelativeDistinguishedNames"); //endregion
    //region Get internal properties from parsed schema

    if ("typesAndValues" in asn1.result) // Could be a case when there is no "types and values"
      this.typesAndValues = Array.from(asn1.result.typesAndValues, element => new _AttributeTypeAndValue.default({
        schema: element
      })); // noinspection JSUnresolvedVariable

    this.valueBeforeDecode = asn1.result.RDN.valueBeforeDecode; //endregion
  } //**********************************************************************************

  /**
   * Convert current object to asn1js object and set correct values
   * @returns {Object} asn1js object
   */


  toSchema() {
    //region Decode stored TBS value
    if (this.valueBeforeDecode.byteLength === 0) // No stored encoded array, create "from scratch"
      {
        return new asn1js.Sequence({
          value: [new asn1js.Set({
            value: Array.from(this.typesAndValues, element => element.toSchema())
          })]
        });
      }

    const asn1 = asn1js.fromBER(this.valueBeforeDecode); //endregion
    //region Construct and return new ASN.1 schema for this object

    return asn1.result; //endregion
  } //**********************************************************************************

  /**
   * Convertion for the class to JSON object
   * @returns {Object}
   */


  toJSON() {
    return {
      typesAndValues: Array.from(this.typesAndValues, element => element.toJSON())
    };
  } //**********************************************************************************

  /**
   * Compare two RDN values, or RDN with ArrayBuffer value
   * @param {(RelativeDistinguishedNames|ArrayBuffer)} compareTo The value compare to current
   * @returns {boolean}
   */


  isEqual(compareTo) {
    if (compareTo instanceof RelativeDistinguishedNames) {
      if (this.typesAndValues.length !== compareTo.typesAndValues.length) return false;

      var _iterator = _createForOfIteratorHelper(this.typesAndValues.entries()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          const _step$value = _slicedToArray(_step.value, 2),
                index = _step$value[0],
                typeAndValue = _step$value[1];

          if (typeAndValue.isEqual(compareTo.typesAndValues[index]) === false) return false;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return true;
    }

    if (compareTo instanceof ArrayBuffer) return (0, _pvutils.isEqualBuffer)(this.valueBeforeDecode, compareTo);
    return false;
  } //**********************************************************************************


} //**************************************************************************************


exports.default = RelativeDistinguishedNames;
//# sourceMappingURL=RelativeDistinguishedNames.js.map