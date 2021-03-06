"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var asn1js = _interopRequireWildcard(require("asn1js"));

var _pvutils = require("pvutils");

var _ContentInfo = _interopRequireDefault(require("./ContentInfo.js"));

var _SafeContents = _interopRequireDefault(require("./SafeContents.js"));

var _EnvelopedData = _interopRequireDefault(require("./EnvelopedData.js"));

var _EncryptedData = _interopRequireDefault(require("./EncryptedData.js"));

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
 * Class from RFC7292
 */
class AuthenticatedSafe {
  //**********************************************************************************

  /**
   * Constructor for AuthenticatedSafe class
   * @param {Object} [parameters={}]
   * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
   */
  constructor(parameters = {}) {
    //region Internal properties of the object

    /**
     * @type {Array.<ContentInfo>}
     * @desc safeContents
     */
    this.safeContents = (0, _pvutils.getParametersValue)(parameters, "safeContents", AuthenticatedSafe.defaultValues("safeContents"));
    if ("parsedValue" in parameters)
      /**
       * @type {*}
       * @desc parsedValue
       */
      this.parsedValue = (0, _pvutils.getParametersValue)(parameters, "parsedValue", AuthenticatedSafe.defaultValues("parsedValue")); //endregion
    //region If input argument array contains "schema" for this object

    if ("schema" in parameters) this.fromSchema(parameters.schema); //endregion
  } //**********************************************************************************

  /**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


  static defaultValues(memberName) {
    switch (memberName) {
      case "safeContents":
        return [];

      case "parsedValue":
        return {};

      default:
        throw new Error(`Invalid member name for AuthenticatedSafe class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Compare values with default values for all class members
   * @param {string} memberName String name for a class member
   * @param {*} memberValue Value to compare with default value
   */


  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case "safeContents":
        return memberValue.length === 0;

      case "parsedValue":
        return memberValue instanceof Object && Object.keys(memberValue).length === 0;

      default:
        throw new Error(`Invalid member name for AuthenticatedSafe class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Return value of pre-defined ASN.1 schema for current class
   *
   * ASN.1 schema:
   * ```asn1
   * AuthenticatedSafe ::= SEQUENCE OF ContentInfo
   * -- Data if unencrypted
   * -- EncryptedData if password-encrypted
   * -- EnvelopedData if public key-encrypted
   * ```
   *
   * @param {Object} parameters Input parameters for the schema
   * @returns {Object} asn1js schema object
   */


  static schema(parameters = {}) {
    /**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [contentInfos]
     */
    const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
    return new asn1js.Sequence({
      name: names.blockName || "",
      value: [new asn1js.Repeated({
        name: names.contentInfos || "",
        value: _ContentInfo.default.schema()
      })]
    });
  } //**********************************************************************************

  /**
   * Convert parsed asn1js object into current class
   * @param {!Object} schema
   */


  fromSchema(schema) {
    //region Clear input data first
    (0, _pvutils.clearProps)(schema, ["contentInfos"]); //endregion
    //region Check the schema is valid

    const asn1 = asn1js.compareSchema(schema, schema, AuthenticatedSafe.schema({
      names: {
        contentInfos: "contentInfos"
      }
    }));
    if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for AuthenticatedSafe"); //endregion
    //region Get internal properties from parsed schema

    this.safeContents = Array.from(asn1.result.contentInfos, element => new _ContentInfo.default({
      schema: element
    })); //endregion
  } //**********************************************************************************

  /**
   * Convert current object to asn1js object and set correct values
   * @returns {Object} asn1js object
   */


  toSchema() {
    //region Construct and return new ASN.1 schema for this object
    return new asn1js.Sequence({
      value: Array.from(this.safeContents, element => element.toSchema())
    }); //endregion
  } //**********************************************************************************

  /**
   * Convertion for the class to JSON object
   * @returns {Object}
   */


  toJSON() {
    return {
      safeContents: Array.from(this.safeContents, element => element.toJSON())
    };
  } //**********************************************************************************


  parseInternalValues(parameters) {
    //region Check input data from "parameters" 
    if (parameters instanceof Object === false) return Promise.reject("The \"parameters\" must has \"Object\" type");
    if ("safeContents" in parameters === false) return Promise.reject("Absent mandatory parameter \"safeContents\"");
    if (parameters.safeContents instanceof Array === false) return Promise.reject("The \"parameters.safeContents\" must has \"Array\" type");
    if (parameters.safeContents.length !== this.safeContents.length) return Promise.reject("Length of \"parameters.safeContents\" must be equal to \"this.safeContents.length\""); //endregion 
    //region Initial variables 

    let sequence = Promise.resolve(); //endregion
    //region Create value for "this.parsedValue.authenticatedSafe" 

    this.parsedValue = {
      safeContents: []
    };

    var _iterator = _createForOfIteratorHelper(this.safeContents.entries()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        const _step$value = _slicedToArray(_step.value, 2),
              index = _step$value[0],
              content = _step$value[1];

        switch (content.contentType) {
          //region data 
          case "1.2.840.113549.1.7.1":
            {
              //region Check that we do have OCTETSTRING as "content"
              if (content.content instanceof asn1js.OctetString === false) return Promise.reject("Wrong type of \"this.safeContents[j].content\""); //endregion
              //region Check we have "constructive encoding" for AuthSafe content

              let authSafeContent = new ArrayBuffer(0);

              if (content.content.valueBlock.isConstructed) {
                var _iterator2 = _createForOfIteratorHelper(content.content.valueBlock.value),
                    _step2;

                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    const contentValue = _step2.value;
                    authSafeContent = (0, _pvutils.utilConcatBuf)(authSafeContent, contentValue.valueBlock.valueHex);
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }
              } else authSafeContent = content.content.valueBlock.valueHex; //endregion
              //region Parse internal ASN.1 data


              const asn1 = asn1js.fromBER(authSafeContent);
              if (asn1.offset === -1) return Promise.reject("Error during parsing of ASN.1 data inside \"content.content\""); //endregion
              //region Finilly initialize initial values of "SafeContents" type

              this.parsedValue.safeContents.push({
                privacyMode: 0,
                // No privacy, clear data
                value: new _SafeContents.default({
                  schema: asn1.result
                })
              }); //endregion
            }
            break;
          //endregion 
          //region envelopedData 

          case "1.2.840.113549.1.7.3":
            {
              //region Initial variables
              const cmsEnveloped = new _EnvelopedData.default({
                schema: content.content
              }); //endregion
              //region Check mandatory parameters

              if ("recipientCertificate" in parameters.safeContents[index] === false) return Promise.reject("Absent mandatory parameter \"recipientCertificate\" in \"parameters.safeContents[j]\"");
              const recipientCertificate = parameters.safeContents[index].recipientCertificate;
              if ("recipientKey" in parameters.safeContents[index] === false) return Promise.reject("Absent mandatory parameter \"recipientKey\" in \"parameters.safeContents[j]\""); // noinspection JSUnresolvedVariable

              const recipientKey = parameters.safeContents[index].recipientKey; //endregion
              //region Decrypt CMS EnvelopedData using first recipient information

              sequence = sequence.then(() => cmsEnveloped.decrypt(0, {
                recipientCertificate,
                recipientPrivateKey: recipientKey
              }));
              sequence = sequence.then(
              /**
               * @param {ArrayBuffer} result
               */
              result => {
                const asn1 = asn1js.fromBER(result);
                if (asn1.offset === -1) return Promise.reject("Error during parsing of decrypted data");
                this.parsedValue.safeContents.push({
                  privacyMode: 2,
                  // Public-key privacy mode
                  value: new _SafeContents.default({
                    schema: asn1.result
                  })
                });
                return Promise.resolve();
              }); //endregion
            }
            break;
          //endregion   
          //region encryptedData 

          case "1.2.840.113549.1.7.6":
            {
              //region Initial variables
              const cmsEncrypted = new _EncryptedData.default({
                schema: content.content
              }); //endregion
              //region Check mandatory parameters

              if ("password" in parameters.safeContents[index] === false) return Promise.reject("Absent mandatory parameter \"password\" in \"parameters.safeContents[j]\"");
              const password = parameters.safeContents[index].password; //endregion
              //region Decrypt CMS EncryptedData using password

              sequence = sequence.then(() => cmsEncrypted.decrypt({
                password
              }), error => Promise.reject(error)); //endregion
              //region Initialize internal data

              sequence = sequence.then(
              /**
               * @param {ArrayBuffer} result
               */
              result => {
                const asn1 = asn1js.fromBER(result);
                if (asn1.offset === -1) return Promise.reject("Error during parsing of decrypted data");
                this.parsedValue.safeContents.push({
                  privacyMode: 1,
                  // Password-based privacy mode
                  value: new _SafeContents.default({
                    schema: asn1.result
                  })
                });
                return Promise.resolve();
              }, error => Promise.reject(error)); //endregion
            }
            break;
          //endregion   
          //region default 

          default:
            throw new Error(`Unknown "contentType" for AuthenticatedSafe: " ${content.contentType}`);
          //endregion 
        }
      } //endregion 

    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return sequence;
  } //**********************************************************************************


  makeInternalValues(parameters) {
    //region Check data in "parsedValue" 
    if ("parsedValue" in this === false) return Promise.reject("Please run \"parseValues\" first or add \"parsedValue\" manually");
    if (this.parsedValue instanceof Object === false) return Promise.reject("The \"this.parsedValue\" must has \"Object\" type");
    if (this.parsedValue.safeContents instanceof Array === false) return Promise.reject("The \"this.parsedValue.safeContents\" must has \"Array\" type"); //endregion 
    //region Check input data from "parameters" 

    if (parameters instanceof Object === false) return Promise.reject("The \"parameters\" must has \"Object\" type");
    if ("safeContents" in parameters === false) return Promise.reject("Absent mandatory parameter \"safeContents\"");
    if (parameters.safeContents instanceof Array === false) return Promise.reject("The \"parameters.safeContents\" must has \"Array\" type");
    if (parameters.safeContents.length !== this.parsedValue.safeContents.length) return Promise.reject("Length of \"parameters.safeContents\" must be equal to \"this.parsedValue.safeContents\""); //endregion 
    //region Initial variables 

    let sequence = Promise.resolve(); //endregion
    //region Create internal values from already parsed values 

    this.safeContents = [];

    var _iterator3 = _createForOfIteratorHelper(this.parsedValue.safeContents.entries()),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        const _step3$value = _slicedToArray(_step3.value, 2),
              index = _step3$value[0],
              content = _step3$value[1];

        //region Check current "content" value
        if ("privacyMode" in content === false) return Promise.reject("The \"privacyMode\" is a mandatory parameter for \"content\"");
        if ("value" in content === false) return Promise.reject("The \"value\" is a mandatory parameter for \"content\"");
        if (content.value instanceof _SafeContents.default === false) return Promise.reject("The \"content.value\" must has \"SafeContents\" type"); //endregion 

        switch (content.privacyMode) {
          //region No privacy 
          case 0:
            {
              const contentBuffer = content.value.toSchema().toBER(false);
              sequence = sequence.then(() => {
                this.safeContents.push(new _ContentInfo.default({
                  contentType: "1.2.840.113549.1.7.1",
                  content: new asn1js.OctetString({
                    valueHex: contentBuffer
                  })
                }));
              });
            }
            break;
          //endregion 
          //region Privacy with password

          case 1:
            {
              //region Initial variables
              const cmsEncrypted = new _EncryptedData.default();
              const currentParameters = parameters.safeContents[index];
              currentParameters.contentToEncrypt = content.value.toSchema().toBER(false); //endregion
              //region Encrypt CMS EncryptedData using password

              sequence = sequence.then(() => cmsEncrypted.encrypt(currentParameters), error => Promise.reject(error)); //endregion
              //region Store result content in CMS_CONTENT_INFO type

              sequence = sequence.then(() => {
                this.safeContents.push(new _ContentInfo.default({
                  contentType: "1.2.840.113549.1.7.6",
                  content: cmsEncrypted.toSchema()
                }));
              }, error => Promise.reject(error)); //endregion
            }
            break;
          //endregion 
          //region Privacy with public key

          case 2:
            {
              //region Initial variables
              const cmsEnveloped = new _EnvelopedData.default();
              const contentToEncrypt = content.value.toSchema().toBER(false); //endregion
              //region Check mandatory parameters

              if ("encryptingCertificate" in parameters.safeContents[index] === false) return Promise.reject("Absent mandatory parameter \"encryptingCertificate\" in \"parameters.safeContents[i]\"");
              if ("encryptionAlgorithm" in parameters.safeContents[index] === false) return Promise.reject("Absent mandatory parameter \"encryptionAlgorithm\" in \"parameters.safeContents[i]\"");

              switch (true) {
                case parameters.safeContents[index].encryptionAlgorithm.name.toLowerCase() === "aes-cbc":
                case parameters.safeContents[index].encryptionAlgorithm.name.toLowerCase() === "aes-gcm":
                  break;

                default:
                  return Promise.reject(`Incorrect parameter "encryptionAlgorithm" in "parameters.safeContents[i]": ${parameters.safeContents[index].encryptionAlgorithm}`);
              }

              switch (true) {
                case parameters.safeContents[index].encryptionAlgorithm.length === 128:
                case parameters.safeContents[index].encryptionAlgorithm.length === 192:
                case parameters.safeContents[index].encryptionAlgorithm.length === 256:
                  break;

                default:
                  return Promise.reject(`Incorrect parameter "encryptionAlgorithm.length" in "parameters.safeContents[i]": ${parameters.safeContents[index].encryptionAlgorithm.length}`);
              } //endregion
              //region Making correct "encryptionAlgorithm" variable


              const encryptionAlgorithm = parameters.safeContents[index].encryptionAlgorithm; //endregion
              //region Append recipient for enveloped data

              cmsEnveloped.addRecipientByCertificate(parameters.safeContents[index].encryptingCertificate); //endregion
              //region Making encryption

              sequence = sequence.then(() => cmsEnveloped.encrypt(encryptionAlgorithm, contentToEncrypt));
              sequence = sequence.then(() => {
                this.safeContents.push(new _ContentInfo.default({
                  contentType: "1.2.840.113549.1.7.3",
                  content: cmsEnveloped.toSchema()
                }));
              }); //endregion
            }
            break;
          //endregion 
          //region default 

          default:
            return Promise.reject(`Incorrect value for "content.privacyMode": ${content.privacyMode}`);
          //endregion 
        }
      } //endregion 
      //region Return result of the function 

    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    return sequence.then(() => this, error => Promise.reject(`Error during parsing: ${error}`)); //endregion   
  } //**********************************************************************************


} //**************************************************************************************


exports.default = AuthenticatedSafe;
//# sourceMappingURL=AuthenticatedSafe.js.map