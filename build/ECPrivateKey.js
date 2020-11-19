"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var asn1js = _interopRequireWildcard(require("asn1js"));

var _pvutils = require("pvutils");

var _ECPublicKey = _interopRequireDefault(require("./ECPublicKey.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//**************************************************************************************

/**
 * Class from RFC5915
 */
class ECPrivateKey {
  //**********************************************************************************

  /**
   * Constructor for ECPrivateKey class
   * @param {Object} [parameters={}]
   * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
   */
  constructor(parameters = {}) {
    //region Internal properties of the object

    /**
     * @type {number}
     * @desc version
     */
    this.version = (0, _pvutils.getParametersValue)(parameters, "version", ECPrivateKey.defaultValues("version"));
    /**
     * @type {OctetString}
     * @desc privateKey
     */

    this.privateKey = (0, _pvutils.getParametersValue)(parameters, "privateKey", ECPrivateKey.defaultValues("privateKey"));
    if ("namedCurve" in parameters)
      /**
       * @type {string}
       * @desc namedCurve
       */
      this.namedCurve = (0, _pvutils.getParametersValue)(parameters, "namedCurve", ECPrivateKey.defaultValues("namedCurve"));
    if ("publicKey" in parameters)
      /**
       * @type {ECPublicKey}
       * @desc publicKey
       */
      this.publicKey = (0, _pvutils.getParametersValue)(parameters, "publicKey", ECPrivateKey.defaultValues("publicKey")); //endregion
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
      case "version":
        return 1;

      case "privateKey":
        return new asn1js.OctetString();

      case "namedCurve":
        return "";

      case "publicKey":
        return new _ECPublicKey.default();

      default:
        throw new Error(`Invalid member name for ECCPrivateKey class: ${memberName}`);
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
        return memberValue === ECPrivateKey.defaultValues(memberName);

      case "privateKey":
        return memberValue.isEqual(ECPrivateKey.defaultValues(memberName));

      case "namedCurve":
        return memberValue === "";

      case "publicKey":
        return _ECPublicKey.default.compareWithDefault("namedCurve", memberValue.namedCurve) && _ECPublicKey.default.compareWithDefault("x", memberValue.x) && _ECPublicKey.default.compareWithDefault("y", memberValue.y);

      default:
        throw new Error(`Invalid member name for ECCPrivateKey class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Return value of pre-defined ASN.1 schema for current class
   *
   * ASN.1 schema:
   * ```asn1
   * ECPrivateKey ::= SEQUENCE {
   * version        INTEGER { ecPrivkeyVer1(1) } (ecPrivkeyVer1),
   * privateKey     OCTET STRING,
   * parameters [0] ECParameters {{ NamedCurve }} OPTIONAL,
   * publicKey  [1] BIT STRING OPTIONAL
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
     * @property {string} [version]
     * @property {string} [privateKey]
     * @property {string} [namedCurve]
     * @property {string} [publicKey]
     */
    const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
    return new asn1js.Sequence({
      name: names.blockName || "",
      value: [new asn1js.Integer({
        name: names.version || ""
      }), new asn1js.OctetString({
        name: names.privateKey || ""
      }), new asn1js.Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          // CONTEXT-SPECIFIC
          tagNumber: 0 // [0]

        },
        value: [new asn1js.ObjectIdentifier({
          name: names.namedCurve || ""
        })]
      }), new asn1js.Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          // CONTEXT-SPECIFIC
          tagNumber: 1 // [1]

        },
        value: [new asn1js.BitString({
          name: names.publicKey || ""
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
    (0, _pvutils.clearProps)(schema, ["version", "privateKey", "namedCurve", "publicKey"]); //endregion
    //region Check the schema is valid

    const asn1 = asn1js.compareSchema(schema, schema, ECPrivateKey.schema({
      names: {
        version: "version",
        privateKey: "privateKey",
        namedCurve: "namedCurve",
        publicKey: "publicKey"
      }
    }));
    if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for ECPrivateKey"); //endregion
    //region Get internal properties from parsed schema

    this.version = asn1.result.version.valueBlock.valueDec;
    this.privateKey = asn1.result.privateKey;
    if ("namedCurve" in asn1.result) this.namedCurve = asn1.result.namedCurve.valueBlock.toString();

    if ("publicKey" in asn1.result) {
      const publicKeyData = {
        schema: asn1.result.publicKey.valueBlock.valueHex
      };
      if ("namedCurve" in this) publicKeyData.namedCurve = this.namedCurve;
      this.publicKey = new _ECPublicKey.default(publicKeyData);
    } //endregion

  } //**********************************************************************************

  /**
   * Convert current object to asn1js object and set correct values
   * @returns {Object} asn1js object
   */


  toSchema() {
    const outputArray = [new asn1js.Integer({
      value: this.version
    }), this.privateKey];

    if ("namedCurve" in this) {
      outputArray.push(new asn1js.Constructed({
        idBlock: {
          tagClass: 3,
          // CONTEXT-SPECIFIC
          tagNumber: 0 // [0]

        },
        value: [new asn1js.ObjectIdentifier({
          value: this.namedCurve
        })]
      }));
    }

    if ("publicKey" in this) {
      outputArray.push(new asn1js.Constructed({
        idBlock: {
          tagClass: 3,
          // CONTEXT-SPECIFIC
          tagNumber: 1 // [1]

        },
        value: [new asn1js.BitString({
          valueHex: this.publicKey.toSchema().toBER(false)
        })]
      }));
    }

    return new asn1js.Sequence({
      value: outputArray
    });
  } //**********************************************************************************

  /**
   * Convertion for the class to JSON object
   * @returns {Object}
   */


  toJSON() {
    if ("namedCurve" in this === false || ECPrivateKey.compareWithDefault("namedCurve", this.namedCurve)) throw new Error("Not enough information for making JSON: absent \"namedCurve\" value");
    let crvName = "";

    switch (this.namedCurve) {
      case "1.2.840.10045.3.1.7":
        // P-256
        crvName = "P-256";
        break;

      case "1.3.132.0.34":
        // P-384
        crvName = "P-384";
        break;

      case "1.3.132.0.35":
        // P-521
        crvName = "P-521";
        break;

      default:
    }

    const privateKeyJSON = {
      crv: crvName,
      d: (0, _pvutils.toBase64)((0, _pvutils.arrayBufferToString)(this.privateKey.valueBlock.valueHex), true, true, false)
    };

    if ("publicKey" in this) {
      const publicKeyJSON = this.publicKey.toJSON();
      privateKeyJSON.x = publicKeyJSON.x;
      privateKeyJSON.y = publicKeyJSON.y;
    }

    return privateKeyJSON;
  } //**********************************************************************************

  /**
   * Convert JSON value into current object
   * @param {Object} json
   */


  fromJSON(json) {
    let coodinateLength = 0;

    if ("crv" in json) {
      switch (json.crv.toUpperCase()) {
        case "P-256":
          this.namedCurve = "1.2.840.10045.3.1.7";
          coodinateLength = 32;
          break;

        case "P-384":
          this.namedCurve = "1.3.132.0.34";
          coodinateLength = 48;
          break;

        case "P-521":
          this.namedCurve = "1.3.132.0.35";
          coodinateLength = 66;
          break;

        default:
      }
    } else throw new Error("Absent mandatory parameter \"crv\"");

    if ("d" in json) {
      const convertBuffer = (0, _pvutils.stringToArrayBuffer)((0, _pvutils.fromBase64)(json.d, true));

      if (convertBuffer.byteLength < coodinateLength) {
        const buffer = new ArrayBuffer(coodinateLength);
        const view = new Uint8Array(buffer);
        const convertBufferView = new Uint8Array(convertBuffer);
        view.set(convertBufferView, 1);
        this.privateKey = new asn1js.OctetString({
          valueHex: buffer
        });
      } else this.privateKey = new asn1js.OctetString({
        valueHex: convertBuffer.slice(0, coodinateLength)
      });
    } else throw new Error("Absent mandatory parameter \"d\"");

    if ("x" in json && "y" in json) this.publicKey = new _ECPublicKey.default({
      json
    });
  } //**********************************************************************************


} //**************************************************************************************


exports.default = ECPrivateKey;
//# sourceMappingURL=ECPrivateKey.js.map