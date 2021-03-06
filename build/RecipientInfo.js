"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var asn1js = _interopRequireWildcard(require("asn1js"));

var _pvutils = require("pvutils");

var _KeyTransRecipientInfo = _interopRequireDefault(require("./KeyTransRecipientInfo.js"));

var _KeyAgreeRecipientInfo = _interopRequireDefault(require("./KeyAgreeRecipientInfo.js"));

var _KEKRecipientInfo = _interopRequireDefault(require("./KEKRecipientInfo.js"));

var _PasswordRecipientinfo = _interopRequireDefault(require("./PasswordRecipientinfo.js"));

var _OtherRecipientInfo = _interopRequireDefault(require("./OtherRecipientInfo.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//**************************************************************************************

/**
 * Class from RFC5652
 */
class RecipientInfo {
  //**********************************************************************************

  /**
   * Constructor for RecipientInfo class
   * @param {Object} [parameters={}]
   * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
   */
  constructor(parameters = {}) {
    //region Internal properties of the object

    /**
     * @type {string}
     * @desc variant
     */
    this.variant = (0, _pvutils.getParametersValue)(parameters, "variant", RecipientInfo.defaultValues("variant"));
    if ("value" in parameters)
      /**
       * @type {*}
       * @desc value
       */
      this.value = (0, _pvutils.getParametersValue)(parameters, "value", RecipientInfo.defaultValues("value")); //endregion
    //region If input argument array contains "schema" for this object

    if ("schema" in parameters) this.fromSchema(parameters.schema); //endregion
  } //**********************************************************************************

  /**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


  static defaultValues(memberName) {
    switch (memberName) {
      case "variant":
        return -1;

      case "value":
        return {};

      default:
        throw new Error(`Invalid member name for RecipientInfo class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Compare values with default values for all class members
   * @param {string} memberName String name for a class member
   * @param {*} memberValue Value to compare with default value
   */


  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case "variant":
        return memberValue === RecipientInfo.defaultValues(memberName);

      case "value":
        return Object.keys(memberValue).length === 0;

      default:
        throw new Error(`Invalid member name for RecipientInfo class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Return value of pre-defined ASN.1 schema for current class
   *
   * ASN.1 schema:
   * ```asn1
   * RecipientInfo ::= CHOICE {
   *    ktri KeyTransRecipientInfo,
   *    kari [1] KeyAgreeRecipientInfo,
   *    kekri [2] KEKRecipientInfo,
   *    pwri [3] PasswordRecipientinfo,
   *    ori [4] OtherRecipientInfo }
   * ```
   *
   * @param {Object} parameters Input parameters for the schema
   * @returns {Object} asn1js schema object
   */


  static schema(parameters = {}) {
    /**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [type]
     * @property {string} [setName]
     * @property {string} [values]
     */
    const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
    return new asn1js.Choice({
      value: [_KeyTransRecipientInfo.default.schema({
        names: {
          blockName: names.blockName || ""
        }
      }), new asn1js.Constructed({
        name: names.blockName || "",
        idBlock: {
          tagClass: 3,
          // CONTEXT-SPECIFIC
          tagNumber: 1 // [1]

        },
        value: _KeyAgreeRecipientInfo.default.schema().valueBlock.value
      }), new asn1js.Constructed({
        name: names.blockName || "",
        idBlock: {
          tagClass: 3,
          // CONTEXT-SPECIFIC
          tagNumber: 2 // [2]

        },
        value: _KEKRecipientInfo.default.schema().valueBlock.value
      }), new asn1js.Constructed({
        name: names.blockName || "",
        idBlock: {
          tagClass: 3,
          // CONTEXT-SPECIFIC
          tagNumber: 3 // [3]

        },
        value: _PasswordRecipientinfo.default.schema().valueBlock.value
      }), new asn1js.Constructed({
        name: names.blockName || "",
        idBlock: {
          tagClass: 3,
          // CONTEXT-SPECIFIC
          tagNumber: 4 // [4]

        },
        value: _OtherRecipientInfo.default.schema().valueBlock.value
      })]
    });
  } //**********************************************************************************

  /**
   * Convert parsed asn1js object into current class
   * @param {!Object} schema
   */


  fromSchema(schema) {
    //region Clear input data first
    (0, _pvutils.clearProps)(schema, ["blockName"]); //endregion
    //region Check the schema is valid

    const asn1 = asn1js.compareSchema(schema, schema, RecipientInfo.schema({
      names: {
        blockName: "blockName"
      }
    }));
    if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for RecipientInfo"); //endregion
    //region Get internal properties from parsed schema

    if (asn1.result.blockName.idBlock.tagClass === 1) {
      this.variant = 1;
      this.value = new _KeyTransRecipientInfo.default({
        schema: asn1.result.blockName
      });
    } else {
      //region Create "SEQUENCE" from "ASN1_CONSTRUCTED"
      const blockSequence = new asn1js.Sequence({
        value: asn1.result.blockName.valueBlock.value
      }); //endregion

      switch (asn1.result.blockName.idBlock.tagNumber) {
        case 1:
          this.variant = 2;
          this.value = new _KeyAgreeRecipientInfo.default({
            schema: blockSequence
          });
          break;

        case 2:
          this.variant = 3;
          this.value = new _KEKRecipientInfo.default({
            schema: blockSequence
          });
          break;

        case 3:
          this.variant = 4;
          this.value = new _PasswordRecipientinfo.default({
            schema: blockSequence
          });
          break;

        case 4:
          this.variant = 5;
          this.value = new _OtherRecipientInfo.default({
            schema: blockSequence
          });
          break;

        default:
          throw new Error("Incorrect structure of RecipientInfo block");
      }
    } //endregion

  } //**********************************************************************************

  /**
   * Convert current object to asn1js object and set correct values
   * @returns {Object} asn1js object
   */


  toSchema() {
    //region Construct and return new ASN.1 schema for this object
    const _schema = this.value.toSchema();

    switch (this.variant) {
      case 1:
        return _schema;

      case 2:
      case 3:
      case 4:
        //region Create "ASN1_CONSTRUCTED" from "SEQUENCE"
        _schema.idBlock.tagClass = 3; // CONTEXT-SPECIFIC

        _schema.idBlock.tagNumber = this.variant - 1; //endregion

        return _schema;

      default:
        return new asn1js.Any();
    } //endregion

  } //**********************************************************************************

  /**
   * Convertion for the class to JSON object
   * @returns {Object}
   */


  toJSON() {
    const _object = {
      variant: this.variant
    };
    if (this.variant >= 1 && this.variant <= 4) _object.value = this.value.toJSON();
    return _object;
  } //**********************************************************************************


} //**************************************************************************************


exports.default = RecipientInfo;
//# sourceMappingURL=RecipientInfo.js.map