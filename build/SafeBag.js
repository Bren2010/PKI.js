"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var asn1js = _interopRequireWildcard(require("asn1js"));

var _pvutils = require("pvutils");

var _Attribute = _interopRequireDefault(require("./Attribute.js"));

var _PrivateKeyInfo = _interopRequireDefault(require("./PrivateKeyInfo.js"));

var _PKCS8ShroudedKeyBag = _interopRequireDefault(require("./PKCS8ShroudedKeyBag.js"));

var _CertBag = _interopRequireDefault(require("./CertBag.js"));

var _CRLBag = _interopRequireDefault(require("./CRLBag.js"));

var _SecretBag = _interopRequireDefault(require("./SecretBag.js"));

var _SafeContents = _interopRequireDefault(require("./SafeContents.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//**************************************************************************************

/**
 * Class from RFC7292
 */
class SafeBag {
  //**********************************************************************************

  /**
   * Constructor for SafeBag class
   * @param {Object} [parameters={}]
   * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
   */
  constructor(parameters = {}) {
    //region Internal properties of the object

    /**
     * @type {string}
     * @desc bagId
     */
    this.bagId = (0, _pvutils.getParametersValue)(parameters, "bagId", SafeBag.defaultValues("bagId"));
    /**
     * @type {*}
     * @desc bagValue
     */

    this.bagValue = (0, _pvutils.getParametersValue)(parameters, "bagValue", SafeBag.defaultValues("bagValue"));
    if ("bagAttributes" in parameters)
      /**
       * @type {Array.<Attribute>}
       * @desc bagAttributes
       */
      this.bagAttributes = (0, _pvutils.getParametersValue)(parameters, "bagAttributes", SafeBag.defaultValues("bagAttributes")); //endregion
    //region If input argument array contains "schema" for this object

    if ("schema" in parameters) this.fromSchema(parameters.schema); //endregion
  } //**********************************************************************************

  /**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


  static defaultValues(memberName) {
    switch (memberName) {
      case "bagId":
        return "";

      case "bagValue":
        return new asn1js.Any();

      case "bagAttributes":
        return [];

      default:
        throw new Error(`Invalid member name for SafeBag class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Compare values with default values for all class members
   * @param {string} memberName String name for a class member
   * @param {*} memberValue Value to compare with default value
   */


  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case "bagId":
        return memberValue === "";

      case "bagValue":
        return memberValue instanceof asn1js.Any;

      case "bagAttributes":
        return memberValue.length === 0;

      default:
        throw new Error(`Invalid member name for SafeBag class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Return value of pre-defined ASN.1 schema for current class
   *
   * ASN.1 schema:
   * ```asn1
   * SafeBag ::= SEQUENCE {
   *    bagId	      	BAG-TYPE.&id ({PKCS12BagSet}),
   *    bagValue      [0] EXPLICIT BAG-TYPE.&Type({PKCS12BagSet}{@bagId}),
   *    bagAttributes SET OF PKCS12Attribute OPTIONAL
   * }
   * ```
   *
   * @param {Object} parameters Input parameters for the schema
   * @returns {Object} asn1js schema object
   */


  static schema(parameters = {}) {
    /**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [bagId]
     * @property {string} [bagValue]
     * @property {string} [bagAttributes]
     */
    const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
    return new asn1js.Sequence({
      name: names.blockName || "",
      value: [new asn1js.ObjectIdentifier({
        name: names.bagId || "bagId"
      }), new asn1js.Constructed({
        idBlock: {
          tagClass: 3,
          // CONTEXT-SPECIFIC
          tagNumber: 0 // [0]

        },
        value: [new asn1js.Any({
          name: names.bagValue || "bagValue"
        })] // EXPLICIT ANY value

      }), new asn1js.Set({
        optional: true,
        value: [new asn1js.Repeated({
          name: names.bagAttributes || "bagAttributes",
          value: _Attribute.default.schema()
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
    (0, _pvutils.clearProps)(schema, ["bagId", "bagValue", "bagAttributes"]); //endregion
    //region Check the schema is valid

    const asn1 = asn1js.compareSchema(schema, schema, SafeBag.schema({
      names: {
        bagId: "bagId",
        bagValue: "bagValue",
        bagAttributes: "bagAttributes"
      }
    }));
    if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for SafeBag"); //endregion
    //region Get internal properties from parsed schema

    this.bagId = asn1.result.bagId.valueBlock.toString();

    switch (this.bagId) {
      case "1.2.840.113549.1.12.10.1.1":
        // keyBag
        this.bagValue = new _PrivateKeyInfo.default({
          schema: asn1.result.bagValue
        });
        break;

      case "1.2.840.113549.1.12.10.1.2":
        // pkcs8ShroudedKeyBag
        this.bagValue = new _PKCS8ShroudedKeyBag.default({
          schema: asn1.result.bagValue
        });
        break;

      case "1.2.840.113549.1.12.10.1.3":
        // certBag
        this.bagValue = new _CertBag.default({
          schema: asn1.result.bagValue
        });
        break;

      case "1.2.840.113549.1.12.10.1.4":
        // crlBag
        this.bagValue = new _CRLBag.default({
          schema: asn1.result.bagValue
        });
        break;

      case "1.2.840.113549.1.12.10.1.5":
        // secretBag
        this.bagValue = new _SecretBag.default({
          schema: asn1.result.bagValue
        });
        break;

      case "1.2.840.113549.1.12.10.1.6":
        // safeContentsBag
        this.bagValue = new _SafeContents.default({
          schema: asn1.result.bagValue
        });
        break;

      default:
        throw new Error(`Invalid "bagId" for SafeBag: ${this.bagId}`);
    }

    if ("bagAttributes" in asn1.result) this.bagAttributes = Array.from(asn1.result.bagAttributes, element => new _Attribute.default({
      schema: element
    })); //endregion
  } //**********************************************************************************

  /**
   * Convert current object to asn1js object and set correct values
   * @returns {Object} asn1js object
   */


  toSchema() {
    //region Construct and return new ASN.1 schema for this object
    const outputArray = [new asn1js.ObjectIdentifier({
      value: this.bagId
    }), new asn1js.Constructed({
      idBlock: {
        tagClass: 3,
        // CONTEXT-SPECIFIC
        tagNumber: 0 // [0]

      },
      value: [this.bagValue.toSchema()]
    })];

    if ("bagAttributes" in this) {
      outputArray.push(new asn1js.Set({
        value: Array.from(this.bagAttributes, element => element.toSchema())
      }));
    }

    return new asn1js.Sequence({
      value: outputArray
    }); //endregion
  } //**********************************************************************************

  /**
   * Convertion for the class to JSON object
   * @returns {Object}
   */


  toJSON() {
    const output = {
      bagId: this.bagId,
      bagValue: this.bagValue.toJSON()
    };
    if ("bagAttributes" in this) output.bagAttributes = Array.from(this.bagAttributes, element => element.toJSON());
    return output;
  } //**********************************************************************************


} //**************************************************************************************


exports.default = SafeBag;
//# sourceMappingURL=SafeBag.js.map