"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var asn1js = _interopRequireWildcard(require("asn1js"));

var _pvutils = require("pvutils");

var _common = require("./common.js");

var _MessageImprint = _interopRequireDefault(require("./MessageImprint.js"));

var _Accuracy = _interopRequireDefault(require("./Accuracy.js"));

var _GeneralName = _interopRequireDefault(require("./GeneralName.js"));

var _Extension = _interopRequireDefault(require("./Extension.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//**************************************************************************************

/**
 * Class from RFC3161
 */
class TSTInfo {
  //**********************************************************************************

  /**
   * Constructor for TSTInfo class
   * @param {Object} [parameters={}]
   * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
   */
  constructor(parameters = {}) {
    //region Internal properties of the object

    /**
     * @type {number}
     * @desc version
     */
    this.version = (0, _pvutils.getParametersValue)(parameters, "version", TSTInfo.defaultValues("version"));
    /**
     * @type {string}
     * @desc policy
     */

    this.policy = (0, _pvutils.getParametersValue)(parameters, "policy", TSTInfo.defaultValues("policy"));
    /**
     * @type {MessageImprint}
     * @desc messageImprint
     */

    this.messageImprint = (0, _pvutils.getParametersValue)(parameters, "messageImprint", TSTInfo.defaultValues("messageImprint"));
    /**
     * @type {Integer}
     * @desc serialNumber
     */

    this.serialNumber = (0, _pvutils.getParametersValue)(parameters, "serialNumber", TSTInfo.defaultValues("serialNumber"));
    /**
     * @type {Date}
     * @desc genTime
     */

    this.genTime = (0, _pvutils.getParametersValue)(parameters, "genTime", TSTInfo.defaultValues("genTime"));
    if ("accuracy" in parameters)
      /**
       * @type {Accuracy}
       * @desc accuracy
       */
      this.accuracy = (0, _pvutils.getParametersValue)(parameters, "accuracy", TSTInfo.defaultValues("accuracy"));
    if ("ordering" in parameters)
      /**
       * @type {boolean}
       * @desc ordering
       */
      this.ordering = (0, _pvutils.getParametersValue)(parameters, "ordering", TSTInfo.defaultValues("ordering"));
    if ("nonce" in parameters)
      /**
       * @type {Integer}
       * @desc nonce
       */
      this.nonce = (0, _pvutils.getParametersValue)(parameters, "nonce", TSTInfo.defaultValues("nonce"));
    if ("tsa" in parameters)
      /**
       * @type {GeneralName}
       * @desc tsa
       */
      this.tsa = (0, _pvutils.getParametersValue)(parameters, "tsa", TSTInfo.defaultValues("tsa"));
    if ("extensions" in parameters)
      /**
       * @type {Array.<Extension>}
       * @desc extensions
       */
      this.extensions = (0, _pvutils.getParametersValue)(parameters, "extensions", TSTInfo.defaultValues("extensions")); //endregion
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

      case "policy":
        return "";

      case "messageImprint":
        return new _MessageImprint.default();

      case "serialNumber":
        return new asn1js.Integer();

      case "genTime":
        return new Date(0, 0, 0);

      case "accuracy":
        return new _Accuracy.default();

      case "ordering":
        return false;

      case "nonce":
        return new asn1js.Integer();

      case "tsa":
        return new _GeneralName.default();

      case "extensions":
        return [];

      default:
        throw new Error(`Invalid member name for TSTInfo class: ${memberName}`);
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
      case "policy":
      case "genTime":
      case "ordering":
        return memberValue === TSTInfo.defaultValues(memberName);

      case "messageImprint":
        return _MessageImprint.default.compareWithDefault("hashAlgorithm", memberValue.hashAlgorithm) && _MessageImprint.default.compareWithDefault("hashedMessage", memberValue.hashedMessage);

      case "serialNumber":
      case "nonce":
        return memberValue.isEqual(TSTInfo.defaultValues(memberName));

      case "accuracy":
        return _Accuracy.default.compareWithDefault("seconds", memberValue.seconds) && _Accuracy.default.compareWithDefault("millis", memberValue.millis) && _Accuracy.default.compareWithDefault("micros", memberValue.micros);

      case "tsa":
        return _GeneralName.default.compareWithDefault("type", memberValue.type) && _GeneralName.default.compareWithDefault("value", memberValue.value);

      case "extensions":
        return memberValue.length === 0;

      default:
        throw new Error(`Invalid member name for TSTInfo class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Return value of pre-defined ASN.1 schema for current class
   *
   * ASN.1 schema:
   * ```asn1
   * TSTInfo ::= SEQUENCE  {
   *   version                      INTEGER  { v1(1) },
   *   policy                       TSAPolicyId,
   *   messageImprint               MessageImprint,
   *   serialNumber                 INTEGER,
   *   genTime                      GeneralizedTime,
   *   accuracy                     Accuracy                 OPTIONAL,
   *   ordering                     BOOLEAN             DEFAULT FALSE,
   *   nonce                        INTEGER                  OPTIONAL,
   *   tsa                          [0] GeneralName          OPTIONAL,
   *   extensions                   [1] IMPLICIT Extensions  OPTIONAL  }
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
     * @property {string} [policy]
     * @property {string} [messageImprint]
     * @property {string} [serialNumber]
     * @property {string} [genTime]
     * @property {string} [accuracy]
     * @property {string} [ordering]
     * @property {string} [nonce]
     * @property {string} [tsa]
     * @property {string} [extensions]
     */
    const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
    return new asn1js.Sequence({
      name: names.blockName || "TSTInfo",
      value: [new asn1js.Integer({
        name: names.version || "TSTInfo.version"
      }), new asn1js.ObjectIdentifier({
        name: names.policy || "TSTInfo.policy"
      }), _MessageImprint.default.schema(names.messageImprint || {
        names: {
          blockName: "TSTInfo.messageImprint"
        }
      }), new asn1js.Integer({
        name: names.serialNumber || "TSTInfo.serialNumber"
      }), new asn1js.GeneralizedTime({
        name: names.genTime || "TSTInfo.genTime"
      }), _Accuracy.default.schema(names.accuracy || {
        names: {
          blockName: "TSTInfo.accuracy"
        }
      }), new asn1js.Boolean({
        name: names.ordering || "TSTInfo.ordering",
        optional: true
      }), new asn1js.Integer({
        name: names.nonce || "TSTInfo.nonce",
        optional: true
      }), new asn1js.Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          // CONTEXT-SPECIFIC
          tagNumber: 0 // [0]

        },
        value: [_GeneralName.default.schema(names.tsa || {
          names: {
            blockName: "TSTInfo.tsa"
          }
        })]
      }), new asn1js.Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          // CONTEXT-SPECIFIC
          tagNumber: 1 // [1]

        },
        value: [new asn1js.Repeated({
          name: names.extensions || "TSTInfo.extensions",
          value: _Extension.default.schema(names.extension || {})
        })]
      }) // IMPLICIT Extensions
      ]
    });
  } //**********************************************************************************

  /**
   * Convert parsed asn1js object into current class
   * @param {!Object} schema
   */


  fromSchema(schema) {
    //region Clear input data first
    (0, _pvutils.clearProps)(schema, ["TSTInfo.version", "TSTInfo.policy", "TSTInfo.messageImprint", "TSTInfo.serialNumber", "TSTInfo.genTime", "TSTInfo.accuracy", "TSTInfo.ordering", "TSTInfo.nonce", "TSTInfo.tsa", "TSTInfo.extensions"]); //endregion
    //region Check the schema is valid

    const asn1 = asn1js.compareSchema(schema, schema, TSTInfo.schema());
    if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for TSTInfo"); //endregion
    //region Get internal properties from parsed schema

    this.version = asn1.result["TSTInfo.version"].valueBlock.valueDec;
    this.policy = asn1.result["TSTInfo.policy"].valueBlock.toString();
    this.messageImprint = new _MessageImprint.default({
      schema: asn1.result["TSTInfo.messageImprint"]
    });
    this.serialNumber = asn1.result["TSTInfo.serialNumber"];
    this.genTime = asn1.result["TSTInfo.genTime"].toDate();
    if ("TSTInfo.accuracy" in asn1.result) this.accuracy = new _Accuracy.default({
      schema: asn1.result["TSTInfo.accuracy"]
    });
    if ("TSTInfo.ordering" in asn1.result) this.ordering = asn1.result["TSTInfo.ordering"].valueBlock.value;
    if ("TSTInfo.nonce" in asn1.result) this.nonce = asn1.result["TSTInfo.nonce"];
    if ("TSTInfo.tsa" in asn1.result) this.tsa = new _GeneralName.default({
      schema: asn1.result["TSTInfo.tsa"]
    });
    if ("TSTInfo.extensions" in asn1.result) this.extensions = Array.from(asn1.result["TSTInfo.extensions"], element => new _Extension.default({
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
    outputArray.push(new asn1js.Integer({
      value: this.version
    }));
    outputArray.push(new asn1js.ObjectIdentifier({
      value: this.policy
    }));
    outputArray.push(this.messageImprint.toSchema());
    outputArray.push(this.serialNumber);
    outputArray.push(new asn1js.GeneralizedTime({
      valueDate: this.genTime
    }));
    if ("accuracy" in this) outputArray.push(this.accuracy.toSchema());
    if ("ordering" in this) outputArray.push(new asn1js.Boolean({
      value: this.ordering
    }));
    if ("nonce" in this) outputArray.push(this.nonce);

    if ("tsa" in this) {
      outputArray.push(new asn1js.Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          // CONTEXT-SPECIFIC
          tagNumber: 0 // [0]

        },
        value: [this.tsa.toSchema()]
      }));
    } //region Create array of extensions


    if ("extensions" in this) {
      outputArray.push(new asn1js.Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          // CONTEXT-SPECIFIC
          tagNumber: 1 // [1]

        },
        value: Array.from(this.extensions, element => element.toSchema())
      }));
    } //endregion
    //endregion
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
      version: this.version,
      policy: this.policy,
      messageImprint: this.messageImprint.toJSON(),
      serialNumber: this.serialNumber.toJSON(),
      genTime: this.genTime
    };
    if ("accuracy" in this) _object.accuracy = this.accuracy.toJSON();
    if ("ordering" in this) _object.ordering = this.ordering;
    if ("nonce" in this) _object.nonce = this.nonce.toJSON();
    if ("tsa" in this) _object.tsa = this.tsa.toJSON();
    if ("extensions" in this) _object.extensions = Array.from(this.extensions, element => element.toJSON());
    return _object;
  } //**********************************************************************************

  /**
   * Verify current TST Info value
   * @param {{data: ArrayBuffer, notBefore: Date, notAfter: Date}} parameters Input parameters
   * @returns {Promise}
   */


  verify(parameters = {}) {
    //region Initial variables
    let sequence = Promise.resolve();
    let data;
    let notBefore = null;
    let notAfter = null; //endregion
    //region Get a "crypto" extension

    const crypto = (0, _common.getCrypto)();
    if (typeof crypto === "undefined") return Promise.reject("Unable to create WebCrypto object"); //endregion
    //region Get initial parameters

    if ("data" in parameters) data = parameters.data;else return Promise.reject("\"data\" is a mandatory attribute for TST_INFO verification");
    if ("notBefore" in parameters) notBefore = parameters.notBefore;
    if ("notAfter" in parameters) notAfter = parameters.notAfter; //endregion
    //region Check date

    if (notBefore !== null) {
      if (this.genTime < notBefore) return Promise.reject("Generation time for TSTInfo object is less than notBefore value");
    }

    if (notAfter !== null) {
      if (this.genTime > notAfter) return Promise.reject("Generation time for TSTInfo object is more than notAfter value");
    } //endregion
    //region Find hashing algorithm


    const shaAlgorithm = (0, _common.getAlgorithmByOID)(this.messageImprint.hashAlgorithm.algorithmId);
    if ("name" in shaAlgorithm === false) return Promise.reject(`Unsupported signature algorithm: ${this.messageImprint.hashAlgorithm.algorithmId}`); //endregion
    //region Calculate message digest for input "data" buffer
    // noinspection JSCheckFunctionSignatures

    sequence = sequence.then(() => crypto.digest(shaAlgorithm.name, new Uint8Array(data))).then(result => (0, _pvutils.isEqualBuffer)(result, this.messageImprint.hashedMessage.valueBlock.valueHex)); //endregion

    return sequence;
  } //**********************************************************************************


} //**************************************************************************************


exports.default = TSTInfo;
//# sourceMappingURL=TSTInfo.js.map