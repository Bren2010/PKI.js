"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var asn1js = _interopRequireWildcard(require("asn1js"));

var _pvutils = require("pvutils");

var _common = require("./common.js");

var _AlgorithmIdentifier = _interopRequireDefault(require("./AlgorithmIdentifier.js"));

var _ECPublicKey = _interopRequireDefault(require("./ECPublicKey.js"));

var _RSAPublicKey = _interopRequireDefault(require("./RSAPublicKey.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//**************************************************************************************

/**
 * Class from RFC5280
 */
class PublicKeyInfo {
  //**********************************************************************************

  /**
   * Constructor for PublicKeyInfo class
   * @param {Object} [parameters={}]
   * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
   */
  constructor(parameters = {}) {
    //region Internal properties of the object

    /**
     * @type {AlgorithmIdentifier}
     * @desc Algorithm identifier
     */
    this.algorithm = (0, _pvutils.getParametersValue)(parameters, "algorithm", PublicKeyInfo.defaultValues("algorithm"));
    /**
     * @type {BitString}
     * @desc Subject public key value
     */

    this.subjectPublicKey = (0, _pvutils.getParametersValue)(parameters, "subjectPublicKey", PublicKeyInfo.defaultValues("subjectPublicKey"));
    if ("parsedKey" in parameters)
      /**
       * @type {ECPublicKey|RSAPublicKey}
       * @desc Parsed public key value
       */
      this.parsedKey = (0, _pvutils.getParametersValue)(parameters, "parsedKey", PublicKeyInfo.defaultValues("parsedKey")); //endregion
    //region If input argument array contains "schema" for this object

    if ("schema" in parameters) this.fromSchema(parameters.schema); //endregion
    //region If input argument array contains "json" for this object

    if ("json" in parameters) this.fromJSON(parameters.json); //endregion
  } //**********************************************************************************

  /**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


  static defaultValues(memberName) {
    switch (memberName) {
      case "algorithm":
        return new _AlgorithmIdentifier.default();

      case "subjectPublicKey":
        return new asn1js.BitString();

      default:
        throw new Error(`Invalid member name for PublicKeyInfo class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Return value of pre-defined ASN.1 schema for current class
   *
   * ASN.1 schema:
   * ```asn1
   * SubjectPublicKeyInfo  ::=  Sequence  {
   *    algorithm            AlgorithmIdentifier,
   *    subjectPublicKey     BIT STRING  }
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
     * @property {string} [subjectPublicKey]
     */
    const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
    return new asn1js.Sequence({
      name: names.blockName || "",
      value: [_AlgorithmIdentifier.default.schema(names.algorithm || {}), new asn1js.BitString({
        name: names.subjectPublicKey || ""
      })]
    });
  } //**********************************************************************************

  /**
   * Convert parsed asn1js object into current class
   * @param {!Object} schema
   */


  fromSchema(schema) {
    //region Clear input data first
    (0, _pvutils.clearProps)(schema, ["algorithm", "subjectPublicKey"]); //endregion
    //region Check the schema is valid

    const asn1 = asn1js.compareSchema(schema, schema, PublicKeyInfo.schema({
      names: {
        algorithm: {
          names: {
            blockName: "algorithm"
          }
        },
        subjectPublicKey: "subjectPublicKey"
      }
    }));
    if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for PublicKeyInfo"); //endregion
    //region Get internal properties from parsed schema

    this.algorithm = new _AlgorithmIdentifier.default({
      schema: asn1.result.algorithm
    });
    this.subjectPublicKey = asn1.result.subjectPublicKey;

    switch (this.algorithm.algorithmId) {
      case "1.2.840.10045.2.1":
        // ECDSA
        if ("algorithmParams" in this.algorithm) {
          if (this.algorithm.algorithmParams.constructor.blockName() === asn1js.ObjectIdentifier.blockName()) {
            try {
              this.parsedKey = new _ECPublicKey.default({
                namedCurve: this.algorithm.algorithmParams.valueBlock.toString(),
                schema: this.subjectPublicKey.valueBlock.valueHex
              });
            } catch (ex) {} // Could be a problems during recognision of internal public key data here. Let's ignore them.

          }
        }

        break;

      case "1.2.840.113549.1.1.1":
        // RSA
        {
          const publicKeyASN1 = asn1js.fromBER(this.subjectPublicKey.valueBlock.valueHex);

          if (publicKeyASN1.offset !== -1) {
            try {
              this.parsedKey = new _RSAPublicKey.default({
                schema: publicKeyASN1.result
              });
            } catch (ex) {} // Could be a problems during recognision of internal public key data here. Let's ignore them.

          }
        }
        break;

      default:
    } //endregion

  } //**********************************************************************************

  /**
   * Convert current object to asn1js object and set correct values
   * @returns {Object} asn1js object
   */


  toSchema() {
    //region Construct and return new ASN.1 schema for this object
    return new asn1js.Sequence({
      value: [this.algorithm.toSchema(), this.subjectPublicKey]
    }); //endregion
  } //**********************************************************************************

  /**
   * Convertion for the class to JSON object
   * @returns {Object}
   */


  toJSON() {
    //region Return common value in case we do not have enough info fo making JWK
    if ("parsedKey" in this === false) {
      return {
        algorithm: this.algorithm.toJSON(),
        subjectPublicKey: this.subjectPublicKey.toJSON()
      };
    } //endregion
    //region Making JWK


    const jwk = {};

    switch (this.algorithm.algorithmId) {
      case "1.2.840.10045.2.1":
        // ECDSA
        jwk.kty = "EC";
        break;

      case "1.2.840.113549.1.1.1":
        // RSA
        jwk.kty = "RSA";
        break;

      default:
    }

    const publicKeyJWK = this.parsedKey.toJSON();

    for (var _i = 0, _Object$keys = Object.keys(publicKeyJWK); _i < _Object$keys.length; _i++) {
      const key = _Object$keys[_i];
      jwk[key] = publicKeyJWK[key];
    }

    return jwk; //endregion
  } //**********************************************************************************

  /**
   * Convert JSON value into current object
   * @param {Object} json
   */


  fromJSON(json) {
    if ("kty" in json) {
      switch (json.kty.toUpperCase()) {
        case "EC":
          this.parsedKey = new _ECPublicKey.default({
            json
          });
          this.algorithm = new _AlgorithmIdentifier.default({
            algorithmId: "1.2.840.10045.2.1",
            algorithmParams: new asn1js.ObjectIdentifier({
              value: this.parsedKey.namedCurve
            })
          });
          break;

        case "RSA":
          this.parsedKey = new _RSAPublicKey.default({
            json
          });
          this.algorithm = new _AlgorithmIdentifier.default({
            algorithmId: "1.2.840.113549.1.1.1",
            algorithmParams: new asn1js.Null()
          });
          break;

        default:
          throw new Error(`Invalid value for "kty" parameter: ${json.kty}`);
      }

      this.subjectPublicKey = new asn1js.BitString({
        valueHex: this.parsedKey.toSchema().toBER(false)
      });
    }
  } //**********************************************************************************


  importKey(publicKey) {
    //region Initial variables
    let sequence = Promise.resolve();

    const _this = this; //endregion
    //region Initial check


    if (typeof publicKey === "undefined") return Promise.reject("Need to provide publicKey input parameter"); //endregion
    //region Get a "crypto" extension

    const crypto = (0, _common.getCrypto)();
    if (typeof crypto === "undefined") return Promise.reject("Unable to create WebCrypto object"); //endregion
    //region Export public key

    sequence = sequence.then(() => crypto.subtle.exportKey("spki", publicKey)); //endregion
    //region Initialize internal variables by parsing exported value

    sequence = sequence.then(
    /**
     * @param {ArrayBuffer} exportedKey
     */
    exportedKey => {
      const asn1 = asn1js.fromBER(exportedKey);

      try {
        _this.fromSchema(asn1.result);
      } catch (exception) {
        return Promise.reject("Error during initializing object from schema");
      }

      return undefined;
    }, error => Promise.reject(`Error during exporting public key: ${error}`)); //endregion

    return sequence;
  } //**********************************************************************************


} //**************************************************************************************


exports.default = PublicKeyInfo;
//# sourceMappingURL=PublicKeyInfo.js.map