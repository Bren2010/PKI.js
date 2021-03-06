"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var asn1js = _interopRequireWildcard(require("asn1js"));

var _pvutils = require("pvutils");

var _AlgorithmIdentifier = _interopRequireDefault(require("./AlgorithmIdentifier.js"));

var _SignedAndUnsignedAttributes = _interopRequireDefault(require("./SignedAndUnsignedAttributes.js"));

var _IssuerAndSerialNumber = _interopRequireDefault(require("./IssuerAndSerialNumber.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//**************************************************************************************

/**
 * Class from RFC5652
 */
class SignerInfo {
  //**********************************************************************************

  /**
   * Constructor for SignerInfo class
   * @param {Object} [parameters={}]
   * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
   */
  constructor(parameters = {}) {
    //region Internal properties of the object

    /**
     * @type {string}
     * @desc version
     */
    this.version = (0, _pvutils.getParametersValue)(parameters, "version", SignerInfo.defaultValues("version"));
    /**
     * @type {Object}
     * @desc sid
     */

    this.sid = (0, _pvutils.getParametersValue)(parameters, "sid", SignerInfo.defaultValues("sid"));
    /**
     * @type {AlgorithmIdentifier}
     * @desc digestAlgorithm
     */

    this.digestAlgorithm = (0, _pvutils.getParametersValue)(parameters, "digestAlgorithm", SignerInfo.defaultValues("digestAlgorithm"));
    if ("signedAttrs" in parameters)
      /**
       * @type {SignedAndUnsignedAttributes}
       * @desc signedAttrs
       */
      this.signedAttrs = (0, _pvutils.getParametersValue)(parameters, "signedAttrs", SignerInfo.defaultValues("signedAttrs"));
    /**
     * @type {AlgorithmIdentifier}
     * @desc digestAlgorithm
     */

    this.signatureAlgorithm = (0, _pvutils.getParametersValue)(parameters, "signatureAlgorithm", SignerInfo.defaultValues("signatureAlgorithm"));
    /**
     * @type {OctetString}
     * @desc signature
     */

    this.signature = (0, _pvutils.getParametersValue)(parameters, "signature", SignerInfo.defaultValues("signature"));
    if ("unsignedAttrs" in parameters)
      /**
       * @type {SignedAndUnsignedAttributes}
       * @desc unsignedAttrs
       */
      this.unsignedAttrs = (0, _pvutils.getParametersValue)(parameters, "unsignedAttrs", SignerInfo.defaultValues("unsignedAttrs")); //endregion
    //region If input argument array contains "schema" for this object

    if ("schema" in parameters) this.fromSchema(parameters.schema); //endregion
  } //**********************************************************************************

  /**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


  static defaultValues(memberName) {
    switch (memberName) {
      case "version":
        return 0;

      case "sid":
        return new asn1js.Any();

      case "digestAlgorithm":
        return new _AlgorithmIdentifier.default();

      case "signedAttrs":
        return new _SignedAndUnsignedAttributes.default({
          type: 0
        });

      case "signatureAlgorithm":
        return new _AlgorithmIdentifier.default();

      case "signature":
        return new asn1js.OctetString();

      case "unsignedAttrs":
        return new _SignedAndUnsignedAttributes.default({
          type: 1
        });

      default:
        throw new Error(`Invalid member name for SignerInfo class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Compare values with default values for all class members
   * @param {string} memberName String name for a class member
   * @param {*} memberValue Value to compare with default value
   */


  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case "version":
        return SignerInfo.defaultValues("version") === memberValue;

      case "sid":
        return memberValue instanceof asn1js.Any;

      case "digestAlgorithm":
        if (memberValue instanceof _AlgorithmIdentifier.default === false) return false;
        return memberValue.isEqual(SignerInfo.defaultValues("digestAlgorithm"));

      case "signedAttrs":
        return _SignedAndUnsignedAttributes.default.compareWithDefault("type", memberValue.type) && _SignedAndUnsignedAttributes.default.compareWithDefault("attributes", memberValue.attributes) && _SignedAndUnsignedAttributes.default.compareWithDefault("encodedValue", memberValue.encodedValue);

      case "signatureAlgorithm":
        if (memberValue instanceof _AlgorithmIdentifier.default === false) return false;
        return memberValue.isEqual(SignerInfo.defaultValues("signatureAlgorithm"));

      case "signature":
      case "unsignedAttrs":
        return _SignedAndUnsignedAttributes.default.compareWithDefault("type", memberValue.type) && _SignedAndUnsignedAttributes.default.compareWithDefault("attributes", memberValue.attributes) && _SignedAndUnsignedAttributes.default.compareWithDefault("encodedValue", memberValue.encodedValue);

      default:
        throw new Error(`Invalid member name for SignerInfo class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Return value of pre-defined ASN.1 schema for current class
   *
   * ASN.1 schema:
   * ```asn1
   * SignerInfo ::= SEQUENCE {
   *    version CMSVersion,
   *    sid SignerIdentifier,
   *    digestAlgorithm DigestAlgorithmIdentifier,
   *    signedAttrs [0] IMPLICIT SignedAttributes OPTIONAL,
   *    signatureAlgorithm SignatureAlgorithmIdentifier,
   *    signature SignatureValue,
   *    unsignedAttrs [1] IMPLICIT UnsignedAttributes OPTIONAL }
   *
   * SignerIdentifier ::= CHOICE {
   *    issuerAndSerialNumber IssuerAndSerialNumber,
   *    subjectKeyIdentifier [0] SubjectKeyIdentifier }
   *
   * SubjectKeyIdentifier ::= OCTET STRING
   * ```
   *
   * @param {Object} parameters Input parameters for the schema
   * @returns {Object} asn1js schema object
   */


  static schema(parameters = {}) {
    /**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [version]
     * @property {string} [sid]
     * @property {string} [digestAlgorithm]
     * @property {string} [signedAttrs]
     * @property {string} [signatureAlgorithm]
     * @property {string} [signature]
     * @property {string} [unsignedAttrs]
     */
    const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
    return new asn1js.Sequence({
      name: "SignerInfo",
      value: [new asn1js.Integer({
        name: names.version || "SignerInfo.version"
      }), new asn1js.Choice({
        value: [_IssuerAndSerialNumber.default.schema(names.sid || {
          names: {
            blockName: "SignerInfo.sid"
          }
        }), new asn1js.Constructed({
          optional: true,
          name: names.sid || "SignerInfo.sid",
          idBlock: {
            tagClass: 3,
            // CONTEXT-SPECIFIC
            tagNumber: 0 // [0]

          },
          value: [new asn1js.OctetString()]
        })]
      }), _AlgorithmIdentifier.default.schema(names.digestAlgorithm || {
        names: {
          blockName: "SignerInfo.digestAlgorithm"
        }
      }), _SignedAndUnsignedAttributes.default.schema(names.signedAttrs || {
        names: {
          blockName: "SignerInfo.signedAttrs",
          tagNumber: 0
        }
      }), _AlgorithmIdentifier.default.schema(names.signatureAlgorithm || {
        names: {
          blockName: "SignerInfo.signatureAlgorithm"
        }
      }), new asn1js.OctetString({
        name: names.signature || "SignerInfo.signature"
      }), _SignedAndUnsignedAttributes.default.schema(names.unsignedAttrs || {
        names: {
          blockName: "SignerInfo.unsignedAttrs",
          tagNumber: 1
        }
      })]
    });
  } //**********************************************************************************

  /**
   * Convert parsed asn1js object into current class
   * @param {!Object} schema
   */


  fromSchema(schema) {
    //region Clear input data first
    (0, _pvutils.clearProps)(schema, ["SignerInfo.version", "SignerInfo.sid", "SignerInfo.digestAlgorithm", "SignerInfo.signedAttrs", "SignerInfo.signatureAlgorithm", "SignerInfo.signature", "SignerInfo.unsignedAttrs"]); //endregion
    //region Check the schema is valid

    const asn1 = asn1js.compareSchema(schema, schema, SignerInfo.schema());
    if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for SignerInfo"); //endregion
    //region Get internal properties from parsed schema

    this.version = asn1.result["SignerInfo.version"].valueBlock.valueDec;
    const currentSid = asn1.result["SignerInfo.sid"];
    if (currentSid.idBlock.tagClass === 1) this.sid = new _IssuerAndSerialNumber.default({
      schema: currentSid
    });else this.sid = currentSid;
    this.digestAlgorithm = new _AlgorithmIdentifier.default({
      schema: asn1.result["SignerInfo.digestAlgorithm"]
    });
    if ("SignerInfo.signedAttrs" in asn1.result) this.signedAttrs = new _SignedAndUnsignedAttributes.default({
      type: 0,
      schema: asn1.result["SignerInfo.signedAttrs"]
    });
    this.signatureAlgorithm = new _AlgorithmIdentifier.default({
      schema: asn1.result["SignerInfo.signatureAlgorithm"]
    });
    this.signature = asn1.result["SignerInfo.signature"];
    if ("SignerInfo.unsignedAttrs" in asn1.result) this.unsignedAttrs = new _SignedAndUnsignedAttributes.default({
      type: 1,
      schema: asn1.result["SignerInfo.unsignedAttrs"]
    }); //endregion
  } //**********************************************************************************

  /**
   * Convert current object to asn1js object and set correct values
   * @returns {Object} asn1js object
   */


  toSchema() {
    if (SignerInfo.compareWithDefault("sid", this.sid)) throw new Error("Incorrectly initialized \"SignerInfo\" class"); //region Create array for output sequence 

    const outputArray = [];
    outputArray.push(new asn1js.Integer({
      value: this.version
    }));
    if (this.sid instanceof _IssuerAndSerialNumber.default) outputArray.push(this.sid.toSchema());else outputArray.push(this.sid);
    outputArray.push(this.digestAlgorithm.toSchema());

    if ("signedAttrs" in this) {
      if (SignerInfo.compareWithDefault("signedAttrs", this.signedAttrs) === false) outputArray.push(this.signedAttrs.toSchema());
    }

    outputArray.push(this.signatureAlgorithm.toSchema());
    outputArray.push(this.signature);

    if ("unsignedAttrs" in this) {
      if (SignerInfo.compareWithDefault("unsignedAttrs", this.unsignedAttrs) === false) outputArray.push(this.unsignedAttrs.toSchema());
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
    if (SignerInfo.compareWithDefault("sid", this.sid)) throw new Error("Incorrectly initialized \"SignerInfo\" class");
    const _object = {
      version: this.version
    };
    if (!(this.sid instanceof asn1js.Any)) _object.sid = this.sid.toJSON();
    _object.digestAlgorithm = this.digestAlgorithm.toJSON();
    if (SignerInfo.compareWithDefault("signedAttrs", this.signedAttrs) === false) _object.signedAttrs = this.signedAttrs.toJSON();
    _object.signatureAlgorithm = this.signatureAlgorithm.toJSON();
    _object.signature = this.signature.toJSON();
    if (SignerInfo.compareWithDefault("unsignedAttrs", this.unsignedAttrs) === false) _object.unsignedAttrs = this.unsignedAttrs.toJSON();
    return _object;
  } //**********************************************************************************


} //**************************************************************************************


exports.default = SignerInfo;
//# sourceMappingURL=SignerInfo.js.map