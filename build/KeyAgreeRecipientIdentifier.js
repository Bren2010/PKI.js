"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var asn1js = _interopRequireWildcard(require("asn1js"));

var _pvutils = require("pvutils");

var _IssuerAndSerialNumber = _interopRequireDefault(require("./IssuerAndSerialNumber.js"));

var _RecipientKeyIdentifier = _interopRequireDefault(require("./RecipientKeyIdentifier.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//**************************************************************************************

/**
 * Class from RFC5652
 */
class KeyAgreeRecipientIdentifier {
  //**********************************************************************************

  /**
   * Constructor for KeyAgreeRecipientIdentifier class
   * @param {Object} [parameters={}]
   * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
   */
  constructor(parameters = {}) {
    //region Internal properties of the object

    /**
     * @type {number}
     * @desc variant
     */
    this.variant = (0, _pvutils.getParametersValue)(parameters, "variant", KeyAgreeRecipientIdentifier.defaultValues("variant"));
    /**
     * @type {*}
     * @desc values
     */

    this.value = (0, _pvutils.getParametersValue)(parameters, "value", KeyAgreeRecipientIdentifier.defaultValues("value")); //endregion
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
        throw new Error(`Invalid member name for KeyAgreeRecipientIdentifier class: ${memberName}`);
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
        return memberValue === -1;

      case "value":
        return Object.keys(memberValue).length === 0;

      default:
        throw new Error(`Invalid member name for KeyAgreeRecipientIdentifier class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Return value of pre-defined ASN.1 schema for current class
   *
   * ASN.1 schema:
   * ```asn1
   * KeyAgreeRecipientIdentifier ::= CHOICE {
   *    issuerAndSerialNumber IssuerAndSerialNumber,
   *    rKeyId [0] IMPLICIT RecipientKeyIdentifier }
   * ```
   *
   * @param {Object} parameters Input parameters for the schema
   * @returns {Object} asn1js schema object
   */


  static schema(parameters = {}) {
    /**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [issuerAndSerialNumber]
     * @property {string} [rKeyId]
     */
    const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
    return new asn1js.Choice({
      value: [_IssuerAndSerialNumber.default.schema(names.issuerAndSerialNumber || {
        names: {
          blockName: names.blockName || ""
        }
      }), new asn1js.Constructed({
        name: names.blockName || "",
        idBlock: {
          tagClass: 3,
          // CONTEXT-SPECIFIC
          tagNumber: 0 // [0]

        },
        value: _RecipientKeyIdentifier.default.schema(names.rKeyId || {
          names: {
            blockName: names.blockName || ""
          }
        }).valueBlock.value
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

    const asn1 = asn1js.compareSchema(schema, schema, KeyAgreeRecipientIdentifier.schema({
      names: {
        blockName: "blockName"
      }
    }));
    if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for KeyAgreeRecipientIdentifier"); //endregion
    //region Get internal properties from parsed schema

    if (asn1.result.blockName.idBlock.tagClass === 1) {
      this.variant = 1;
      this.value = new _IssuerAndSerialNumber.default({
        schema: asn1.result.blockName
      });
    } else {
      this.variant = 2;
      this.value = new _RecipientKeyIdentifier.default({
        schema: new asn1js.Sequence({
          value: asn1.result.blockName.valueBlock.value
        })
      });
    } //endregion

  } //**********************************************************************************

  /**
   * Convert current object to asn1js object and set correct values
   * @returns {Object} asn1js object
   */


  toSchema() {
    //region Construct and return new ASN.1 schema for this object
    switch (this.variant) {
      case 1:
        return this.value.toSchema();

      case 2:
        return new asn1js.Constructed({
          idBlock: {
            tagClass: 3,
            // CONTEXT-SPECIFIC
            tagNumber: 0 // [0]

          },
          value: this.value.toSchema().valueBlock.value
        });

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
    if (this.variant === 1 || this.variant === 2) _object.value = this.value.toJSON();
    return _object;
  } //**********************************************************************************


} //**************************************************************************************


exports.default = KeyAgreeRecipientIdentifier;
//# sourceMappingURL=KeyAgreeRecipientIdentifier.js.map