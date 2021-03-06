"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var asn1js = _interopRequireWildcard(require("asn1js"));

var _pvutils = require("pvutils");

var _common = require("./common.js");

var _AlgorithmIdentifier = _interopRequireDefault(require("./AlgorithmIdentifier.js"));

var _EncapsulatedContentInfo = _interopRequireDefault(require("./EncapsulatedContentInfo.js"));

var _Certificate = _interopRequireDefault(require("./Certificate.js"));

var _CertificateRevocationList = _interopRequireDefault(require("./CertificateRevocationList.js"));

var _OtherRevocationInfoFormat = _interopRequireDefault(require("./OtherRevocationInfoFormat.js"));

var _SignerInfo = _interopRequireDefault(require("./SignerInfo.js"));

var _CertificateSet = _interopRequireDefault(require("./CertificateSet.js"));

var _RevocationInfoChoices = _interopRequireDefault(require("./RevocationInfoChoices.js"));

var _IssuerAndSerialNumber = _interopRequireDefault(require("./IssuerAndSerialNumber.js"));

var _TSTInfo = _interopRequireDefault(require("./TSTInfo.js"));

var _CertificateChainValidationEngine = _interopRequireDefault(require("./CertificateChainValidationEngine.js"));

var _BasicOCSPResponse = _interopRequireDefault(require("./BasicOCSPResponse.js"));

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
 * Class from RFC5652
 */
class SignedData {
  //**********************************************************************************

  /**
   * Constructor for SignedData class
   * @param {Object} [parameters={}]
   * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
   */
  constructor(parameters = {}) {
    //region Internal properties of the object

    /**
     * @type {number}
     * @desc version
     */
    this.version = (0, _pvutils.getParametersValue)(parameters, "version", SignedData.defaultValues("version"));
    /**
     * @type {Array.<AlgorithmIdentifier>}
     * @desc digestAlgorithms
     */

    this.digestAlgorithms = (0, _pvutils.getParametersValue)(parameters, "digestAlgorithms", SignedData.defaultValues("digestAlgorithms"));
    /**
     * @type {EncapsulatedContentInfo}
     * @desc encapContentInfo
     */

    this.encapContentInfo = (0, _pvutils.getParametersValue)(parameters, "encapContentInfo", SignedData.defaultValues("encapContentInfo"));
    if ("certificates" in parameters)
      /**
       * @type {Array.<Certificate|OtherCertificateFormat>}
       * @desc certificates
       */
      this.certificates = (0, _pvutils.getParametersValue)(parameters, "certificates", SignedData.defaultValues("certificates"));
    if ("crls" in parameters)
      /**
       * @type {Array.<CertificateRevocationList|OtherRevocationInfoFormat>}
       * @desc crls
       */
      this.crls = (0, _pvutils.getParametersValue)(parameters, "crls", SignedData.defaultValues("crls"));
    if ("ocsps" in parameters)
      /**
       * @type {Array.<BasicOCSPResponse>}
       * @desc crls
       */
      this.ocsps = (0, _pvutils.getParametersValue)(parameters, "ocsps", SignedData.defaultValues("ocsps"));
    /**
     * @type {Array.<SignerInfo>}
     * @desc signerInfos
     */

    this.signerInfos = (0, _pvutils.getParametersValue)(parameters, "signerInfos", SignedData.defaultValues("signerInfos")); //endregion
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

      case "digestAlgorithms":
        return [];

      case "encapContentInfo":
        return new _EncapsulatedContentInfo.default();

      case "certificates":
        return [];

      case "crls":
        return [];

      case "ocsps":
        return [];

      case "signerInfos":
        return [];

      default:
        throw new Error(`Invalid member name for SignedData class: ${memberName}`);
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
        return memberValue === SignedData.defaultValues("version");

      case "encapContentInfo":
        return new _EncapsulatedContentInfo.default();

      case "digestAlgorithms":
      case "certificates":
      case "crls":
      case "ocsps":
      case "signerInfos":
        return memberValue.length === 0;

      default:
        throw new Error(`Invalid member name for SignedData class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Return value of pre-defined ASN.1 schema for current class
   *
   * ASN.1 schema:
   * ```asn1
   * SignedData ::= SEQUENCE {
   *    version CMSVersion,
   *    digestAlgorithms DigestAlgorithmIdentifiers,
   *    encapContentInfo EncapsulatedContentInfo,
   *    certificates [0] IMPLICIT CertificateSet OPTIONAL,
   *    crls [1] IMPLICIT RevocationInfoChoices OPTIONAL,
   *    signerInfos SignerInfos }
   * ```
   *
   * @param {Object} parameters Input parameters for the schema
   * @returns {Object} asn1js schema object
   */


  static schema(parameters = {}) {
    /**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [optional]
     * @property {string} [digestAlgorithms]
     * @property {string} [encapContentInfo]
     * @property {string} [certificates]
     * @property {string} [crls]
     * @property {string} [signerInfos]
     */
    const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
    if ("optional" in names === false) names.optional = false;
    return new asn1js.Sequence({
      name: names.blockName || "SignedData",
      optional: names.optional,
      value: [new asn1js.Integer({
        name: names.version || "SignedData.version"
      }), new asn1js.Set({
        value: [new asn1js.Repeated({
          name: names.digestAlgorithms || "SignedData.digestAlgorithms",
          value: _AlgorithmIdentifier.default.schema()
        })]
      }), _EncapsulatedContentInfo.default.schema(names.encapContentInfo || {
        names: {
          blockName: "SignedData.encapContentInfo"
        }
      }), new asn1js.Constructed({
        name: names.certificates || "SignedData.certificates",
        optional: true,
        idBlock: {
          tagClass: 3,
          // CONTEXT-SPECIFIC
          tagNumber: 0 // [0]

        },
        value: _CertificateSet.default.schema().valueBlock.value
      }), // IMPLICIT CertificateSet
      new asn1js.Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          // CONTEXT-SPECIFIC
          tagNumber: 1 // [1]

        },
        value: _RevocationInfoChoices.default.schema(names.crls || {
          names: {
            crls: "SignedData.crls"
          }
        }).valueBlock.value
      }), // IMPLICIT RevocationInfoChoices
      new asn1js.Set({
        value: [new asn1js.Repeated({
          name: names.signerInfos || "SignedData.signerInfos",
          value: _SignerInfo.default.schema()
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
    (0, _pvutils.clearProps)(schema, ["SignedData.version", "SignedData.digestAlgorithms", "SignedData.encapContentInfo", "SignedData.certificates", "SignedData.crls", "SignedData.signerInfos"]); //endregion
    //region Check the schema is valid

    const asn1 = asn1js.compareSchema(schema, schema, SignedData.schema());
    if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for SignedData"); //endregion
    //region Get internal properties from parsed schema

    this.version = asn1.result["SignedData.version"].valueBlock.valueDec;
    if ("SignedData.digestAlgorithms" in asn1.result) // Could be empty SET of digest algorithms
      this.digestAlgorithms = Array.from(asn1.result["SignedData.digestAlgorithms"], algorithm => new _AlgorithmIdentifier.default({
        schema: algorithm
      }));
    this.encapContentInfo = new _EncapsulatedContentInfo.default({
      schema: asn1.result["SignedData.encapContentInfo"]
    });

    if ("SignedData.certificates" in asn1.result) {
      const certificateSet = new _CertificateSet.default({
        schema: new asn1js.Set({
          value: asn1.result["SignedData.certificates"].valueBlock.value
        })
      });
      this.certificates = certificateSet.certificates.slice(0); // Copy all just for making comfortable access
    }

    if ("SignedData.crls" in asn1.result) {
      this.crls = Array.from(asn1.result["SignedData.crls"], crl => {
        if (crl.idBlock.tagClass === 1) return new _CertificateRevocationList.default({
          schema: crl
        }); //region Create SEQUENCE from [1]

        crl.idBlock.tagClass = 1; // UNIVERSAL

        crl.idBlock.tagNumber = 16; // SEQUENCE
        //endregion

        return new _OtherRevocationInfoFormat.default({
          schema: crl
        });
      });
    }

    if ("SignedData.signerInfos" in asn1.result) // Could be empty SET SignerInfos
      this.signerInfos = Array.from(asn1.result["SignedData.signerInfos"], signerInfoSchema => new _SignerInfo.default({
        schema: signerInfoSchema
      })); //endregion
  } //**********************************************************************************

  /**
   * Convert current object to asn1js object and set correct values
   * @returns {Object} asn1js object
   */


  toSchema(encodeFlag = false) {
    //region Create array for output sequence
    const outputArray = [];
    outputArray.push(new asn1js.Integer({
      value: this.version
    })); //region Create array of digest algorithms

    outputArray.push(new asn1js.Set({
      value: Array.from(this.digestAlgorithms, algorithm => algorithm.toSchema(encodeFlag))
    })); //endregion

    outputArray.push(this.encapContentInfo.toSchema());

    if ("certificates" in this) {
      const certificateSet = new _CertificateSet.default({
        certificates: this.certificates
      });
      const certificateSetSchema = certificateSet.toSchema();
      outputArray.push(new asn1js.Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: certificateSetSchema.valueBlock.value
      }));
    }

    if ("crls" in this) {
      outputArray.push(new asn1js.Constructed({
        idBlock: {
          tagClass: 3,
          // CONTEXT-SPECIFIC
          tagNumber: 1 // [1]

        },
        value: Array.from(this.crls, crl => {
          if (crl instanceof _OtherRevocationInfoFormat.default) {
            const crlSchema = crl.toSchema(encodeFlag);
            crlSchema.idBlock.tagClass = 3;
            crlSchema.idBlock.tagNumber = 1;
            return crlSchema;
          }

          return crl.toSchema(encodeFlag);
        })
      }));
    } //region Create array of signer infos


    outputArray.push(new asn1js.Set({
      value: Array.from(this.signerInfos, signerInfo => signerInfo.toSchema(encodeFlag))
    })); //endregion
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
      digestAlgorithms: Array.from(this.digestAlgorithms, algorithm => algorithm.toJSON()),
      encapContentInfo: this.encapContentInfo.toJSON()
    };
    if ("certificates" in this) _object.certificates = Array.from(this.certificates, certificate => certificate.toJSON());
    if ("crls" in this) _object.crls = Array.from(this.crls, crl => crl.toJSON());
    _object.signerInfos = Array.from(this.signerInfos, signerInfo => signerInfo.toJSON());
    return _object;
  } //**********************************************************************************

  /**
   * Verify current SignedData value
   * @param {Object} [param={}]
   * @param {Number} [param.signer = -1] Index of the signer which information we need to verify
   * @param {ArrayBuffer} [param.data=new ArrayBuffer(0)]
   * @param {Array.<Certificate>} [param.trustedCerts=[]]
   * @param {Date} [param.checkDate=new Date()]
   * @param {Boolean} [param.checkChain=false]
   * @param {Boolean} [param.extendedMode=false]
   * @param {?Function} [findOrigin=null]
   * @param {?Function} [findIssuer=null]
   */


  verify({
    signer = -1,
    data = new ArrayBuffer(0),
    trustedCerts = [],
    checkDate = new Date(),
    checkChain = false,
    extendedMode = false,
    passedWhenNotRevValues = false,
    findOrigin = null,
    findIssuer = null
  } = {}) {
    //region Global variables
    let sequence = Promise.resolve();
    let messageDigestValue = new ArrayBuffer(0);
    let shaAlgorithm = "";
    let signerCertificate = {};
    let timestampSerial = null;
    let certificatePath = [];
    const engine = (0, _common.getEngine)(); //endregion
    //region Get a "crypto" extension

    const crypto = (0, _common.getCrypto)();
    if (typeof crypto === "undefined") return Promise.reject("Unable to create WebCrypto object"); //endregion
    //region Get a signer number

    if (signer === -1) {
      if (extendedMode) {
        return Promise.reject({
          date: checkDate,
          code: 1,
          message: "Unable to get signer index from input parameters",
          signatureVerified: null,
          signerCertificate: null,
          signerCertificateVerified: null
        });
      }

      return Promise.reject("Unable to get signer index from input parameters");
    } //endregion
    //region Check that certificates field was included in signed data


    if ("certificates" in this === false) {
      if (extendedMode) {
        return Promise.reject({
          date: checkDate,
          code: 2,
          message: "No certificates attached to this signed data",
          signatureVerified: null,
          signerCertificate: null,
          signerCertificateVerified: null
        });
      }

      return Promise.reject("No certificates attached to this signed data");
    } //endregion
    //region Find a certificate for specified signer


    if (this.signerInfos[signer].sid instanceof _IssuerAndSerialNumber.default) {
      sequence = sequence.then(() => {
        var _iterator = _createForOfIteratorHelper(this.certificates),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            const certificate = _step.value;
            if (certificate instanceof _Certificate.default === false) continue;

            if (certificate.issuer.isEqual(this.signerInfos[signer].sid.issuer) && certificate.serialNumber.isEqual(this.signerInfos[signer].sid.serialNumber)) {
              signerCertificate = certificate;
              return Promise.resolve();
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        if (extendedMode) {
          return Promise.reject({
            date: checkDate,
            code: 3,
            message: "Unable to find signer certificate",
            signatureVerified: null,
            signerCertificate: null,
            signerCertificateVerified: null
          });
        }

        return Promise.reject("Unable to find signer certificate");
      });
    } else // Find by SubjectKeyIdentifier
      {
        sequence = sequence.then(() => Promise.all(Array.from(this.certificates.filter(certificate => certificate instanceof _Certificate.default), certificate => crypto.digest({
          name: "sha-1"
        }, new Uint8Array(certificate.subjectPublicKeyInfo.subjectPublicKey.valueBlock.valueHex)))).then(results => {
          var _iterator2 = _createForOfIteratorHelper(this.certificates.entries()),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              const _step2$value = _slicedToArray(_step2.value, 2),
                    index = _step2$value[0],
                    certificate = _step2$value[1];

              if (certificate instanceof _Certificate.default === false) continue;

              if ((0, _pvutils.isEqualBuffer)(results[index], this.signerInfos[signer].sid.valueBlock.valueHex)) {
                signerCertificate = certificate;
                return Promise.resolve();
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          if (extendedMode) {
            return Promise.reject({
              date: checkDate,
              code: 3,
              message: "Unable to find signer certificate",
              signatureVerified: null,
              signerCertificate: null,
              signerCertificateVerified: null
            });
          }

          return Promise.reject("Unable to find signer certificate");
        }, () => {
          if (extendedMode) {
            return Promise.reject({
              date: checkDate,
              code: 3,
              message: "Unable to find signer certificate",
              signatureVerified: null,
              signerCertificate: null,
              signerCertificateVerified: null
            });
          }

          return Promise.reject("Unable to find signer certificate");
        }));
      } //endregion
    //region Verify internal digest in case of "tSTInfo" content type


    sequence = sequence.then(() => {
      if (this.encapContentInfo.eContentType === "1.2.840.113549.1.9.16.1.4") {
        //region Check "eContent" precense
        if ("eContent" in this.encapContentInfo === false) return false; //endregion
        //region Initialize TST_INFO value

        const asn1 = asn1js.fromBER(this.encapContentInfo.eContent.valueBlock.valueHex);
        let tstInfo;

        try {
          tstInfo = new _TSTInfo.default({
            schema: asn1.result
          });
        } catch (ex) {
          return false;
        } //endregion
        //region Change "checkDate" and append "timestampSerial"


        checkDate = tstInfo.genTime;
        timestampSerial = tstInfo.serialNumber.valueBlock.valueHex; //endregion
        //region Check that we do have detached data content

        if (data.byteLength === 0) {
          if (extendedMode) {
            return Promise.reject({
              date: checkDate,
              code: 4,
              message: "Missed detached data input array",
              signatureVerified: null,
              signerCertificate,
              signerCertificateVerified: null
            });
          }

          return Promise.reject("Missed detached data input array");
        } //endregion


        return tstInfo.verify({
          data
        });
      }

      return true;
    }); //endregion
    //region Make additional verification for signer's certificate

    function checkCA(cert) {
      /// <param name="cert" type="in_window.org.pkijs.simpl.CERT">Certificate to find CA flag for</param>
      //region Do not include signer's certificate
      if (cert.issuer.isEqual(signerCertificate.issuer) === true && cert.serialNumber.isEqual(signerCertificate.serialNumber) === true) return null; //endregion

      let isCA = false;

      if ("extensions" in cert) {
        var _iterator3 = _createForOfIteratorHelper(cert.extensions),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            const extension = _step3.value;

            if (extension.extnID === "2.5.29.19") // BasicConstraints
              {
                if ("cA" in extension.parsedValue) {
                  if (extension.parsedValue.cA === true) isCA = true;
                }
              }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }

      if (isCA) return cert;
      return null;
    }

    if (checkChain) {
      sequence = sequence.then(result => {
        //region Verify result of previous operation
        if (result === false) return false; //endregion

        const promiseResults = Array.from(this.certificates.filter(certificate => certificate instanceof _Certificate.default), certificate => checkCA(certificate));
        const certificateChainValidationEngineParameters = {
          checkDate,
          certs: Array.from(promiseResults.filter(_result => _result !== null)),
          trustedCerts
        };
        if (findIssuer !== null) certificateChainValidationEngineParameters.findIssuer = findIssuer;
        if (findOrigin !== null) certificateChainValidationEngineParameters.findOrigin = findOrigin;
        const certificateChainEngine = new _CertificateChainValidationEngine.default(certificateChainValidationEngineParameters);
        certificateChainEngine.certs.push(signerCertificate);

        if ("crls" in this) {
          var _iterator4 = _createForOfIteratorHelper(this.crls),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              const crl = _step4.value;
              if ("thisUpdate" in crl) certificateChainEngine.crls.push(crl);else // Assumed "revocation value" has "OtherRevocationInfoFormat"
                {
                  if (crl.otherRevInfoFormat === "1.3.6.1.5.5.7.48.1.1") // Basic OCSP response
                    certificateChainEngine.ocsps.push(new _BasicOCSPResponse.default({
                      schema: crl.otherRevInfo
                    }));
                }
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        }

        if ("ocsps" in this) certificateChainEngine.ocsps.push(...this.ocsps);
        return certificateChainEngine.verify({
          passedWhenNotRevValues
        }).then(verificationResult => {
          if ("certificatePath" in verificationResult) certificatePath = verificationResult.certificatePath;
          if (verificationResult.result === true) return Promise.resolve(true);

          if (extendedMode) {
            return Promise.reject({
              date: checkDate,
              code: 5,
              message: `Validation of signer's certificate failed: ${verificationResult.resultMessage}`,
              signatureVerified: null,
              signerCertificate,
              signerCertificateVerified: false
            });
          }

          return Promise.reject("Validation of signer's certificate failed");
        }, error => {
          if (extendedMode) {
            return Promise.reject({
              date: checkDate,
              code: 5,
              message: `Validation of signer's certificate failed with error: ${error instanceof Object ? error.resultMessage : error}`,
              signatureVerified: null,
              signerCertificate,
              signerCertificateVerified: false
            });
          }

          return Promise.reject(`Validation of signer's certificate failed with error: ${error instanceof Object ? error.resultMessage : error}`);
        });
      });
    } //endregion
    //region Find signer's hashing algorithm


    sequence = sequence.then(result => {
      //region Verify result of previous operation
      if (result === false) return false; //endregion

      const signerInfoHashAlgorithm = (0, _common.getAlgorithmByOID)(this.signerInfos[signer].digestAlgorithm.algorithmId);

      if ("name" in signerInfoHashAlgorithm === false) {
        if (extendedMode) {
          return Promise.reject({
            date: checkDate,
            code: 7,
            message: `Unsupported signature algorithm: ${this.signerInfos[signer].digestAlgorithm.algorithmId}`,
            signatureVerified: null,
            signerCertificate,
            signerCertificateVerified: true
          });
        }

        return Promise.reject(`Unsupported signature algorithm: ${this.signerInfos[signer].digestAlgorithm.algorithmId}`);
      }

      shaAlgorithm = signerInfoHashAlgorithm.name;
      return true;
    }); //endregion
    //region Create correct data block for verification

    sequence = sequence.then(result => {
      //region Verify result of previous operation
      if (result === false) return false; //endregion

      if ("eContent" in this.encapContentInfo) // Attached data
        {
          if (this.encapContentInfo.eContent.idBlock.tagClass === 1 && this.encapContentInfo.eContent.idBlock.tagNumber === 4) {
            if (this.encapContentInfo.eContent.idBlock.isConstructed === false) data = this.encapContentInfo.eContent.valueBlock.valueHex;else {
              var _iterator5 = _createForOfIteratorHelper(this.encapContentInfo.eContent.valueBlock.value),
                  _step5;

              try {
                for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                  const contentValue = _step5.value;
                  data = (0, _pvutils.utilConcatBuf)(data, contentValue.valueBlock.valueHex);
                }
              } catch (err) {
                _iterator5.e(err);
              } finally {
                _iterator5.f();
              }
            }
          } else data = this.encapContentInfo.eContent.valueBlock.valueBeforeDecode;
        } else // Detached data
        {
          if (data.byteLength === 0) // Check that "data" already provided by function parameter
            {
              if (extendedMode) {
                return Promise.reject({
                  date: checkDate,
                  code: 8,
                  message: "Missed detached data input array",
                  signatureVerified: null,
                  signerCertificate,
                  signerCertificateVerified: true
                });
              }

              return Promise.reject("Missed detached data input array");
            }
        }

      if ("signedAttrs" in this.signerInfos[signer]) {
        //region Check mandatory attributes
        let foundContentType = false;
        let foundMessageDigest = false;

        var _iterator6 = _createForOfIteratorHelper(this.signerInfos[signer].signedAttrs.attributes),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            const attribute = _step6.value;
            //region Check that "content-type" attribute exists
            if (attribute.type === "1.2.840.113549.1.9.3") foundContentType = true; //endregion
            //region Check that "message-digest" attribute exists

            if (attribute.type === "1.2.840.113549.1.9.4") {
              foundMessageDigest = true;
              messageDigestValue = attribute.values[0].valueBlock.valueHex;
            } //endregion
            //region Speed-up searching


            if (foundContentType && foundMessageDigest) break; //endregion
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }

        if (foundContentType === false) {
          if (extendedMode) {
            return Promise.reject({
              date: checkDate,
              code: 9,
              message: "Attribute \"content-type\" is a mandatory attribute for \"signed attributes\"",
              signatureVerified: null,
              signerCertificate,
              signerCertificateVerified: true
            });
          }

          return Promise.reject("Attribute \"content-type\" is a mandatory attribute for \"signed attributes\"");
        }

        if (foundMessageDigest === false) {
          if (extendedMode) {
            return Promise.reject({
              date: checkDate,
              code: 10,
              message: "Attribute \"message-digest\" is a mandatory attribute for \"signed attributes\"",
              signatureVerified: null,
              signerCertificate,
              signerCertificateVerified: true
            });
          }

          return Promise.reject("Attribute \"message-digest\" is a mandatory attribute for \"signed attributes\"");
        } //endregion

      }

      return true;
    }); //endregion
    //region Verify "message-digest" attribute in case of "signedAttrs"

    sequence = sequence.then(result => {
      //region Verify result of previous operation
      if (result === false) return false; //endregion

      if ("signedAttrs" in this.signerInfos[signer]) return crypto.digest(shaAlgorithm, new Uint8Array(data));
      return true;
    }).then(
    /**
     * @param {ArrayBuffer} result
     */
    result => {
      //region Verify result of previous operation
      if (result === false) return false; //endregion

      if ("signedAttrs" in this.signerInfos[signer]) {
        if ((0, _pvutils.isEqualBuffer)(result, messageDigestValue)) {
          data = this.signerInfos[signer].signedAttrs.encodedValue;
          return true;
        }

        return false;
      }

      return true;
    }); //endregion

    sequence = sequence.then(result => {
      //region Verify result of previous operation
      if (result === false) return false; //endregion

      return engine.subtle.verifyWithPublicKey(data, this.signerInfos[signer].signature, signerCertificate.subjectPublicKeyInfo, signerCertificate.signatureAlgorithm, shaAlgorithm);
    }); //region Make a final result

    sequence = sequence.then(result => {
      if (extendedMode) {
        return {
          date: checkDate,
          code: 14,
          message: "",
          signatureVerified: result,
          signerCertificate,
          timestampSerial,
          signerCertificateVerified: true,
          certificatePath
        };
      }

      return result;
    }, error => {
      if (extendedMode) {
        if ("code" in error) return Promise.reject(error);
        return Promise.reject({
          date: checkDate,
          code: 15,
          message: `Error during verification: ${error.message}`,
          signatureVerified: null,
          signerCertificate,
          timestampSerial,
          signerCertificateVerified: true
        });
      }

      return Promise.reject(error);
    }); //endregion

    return sequence;
  } //**********************************************************************************

  /**
   * Signing current SignedData
   * @param {key} privateKey Private key for "subjectPublicKeyInfo" structure
   * @param {number} signerIndex Index number (starting from 0) of signer index to make signature for
   * @param {string} [hashAlgorithm="SHA-1"] Hashing algorithm. Default SHA-1
   * @param {ArrayBuffer} [data] Detached data
   * @returns {*}
   */


  sign(privateKey, signerIndex, hashAlgorithm = "SHA-1", data = new ArrayBuffer(0)) {
    //region Initial checking
    if (typeof privateKey === "undefined") return Promise.reject("Need to provide a private key for signing"); //endregion
    //region Initial variables

    let sequence = Promise.resolve();
    let parameters;
    const engine = (0, _common.getEngine)(); //endregion
    //region Simple check for supported algorithm

    const hashAlgorithmOID = (0, _common.getOIDByAlgorithm)({
      name: hashAlgorithm
    });
    if (hashAlgorithmOID === "") return Promise.reject(`Unsupported hash algorithm: ${hashAlgorithm}`); //endregion
    //region Append information about hash algorithm

    if (this.digestAlgorithms.filter(algorithm => algorithm.algorithmId === hashAlgorithmOID).length === 0) {
      this.digestAlgorithms.push(new _AlgorithmIdentifier.default({
        algorithmId: hashAlgorithmOID,
        algorithmParams: new asn1js.Null()
      }));
    }

    this.signerInfos[signerIndex].digestAlgorithm = new _AlgorithmIdentifier.default({
      algorithmId: hashAlgorithmOID,
      algorithmParams: new asn1js.Null()
    }); //endregion
    //region Get a "default parameters" for current algorithm and set correct signature algorithm

    sequence = sequence.then(() => engine.subtle.getSignatureParameters(privateKey, hashAlgorithm));
    sequence = sequence.then(result => {
      parameters = result.parameters;
      this.signerInfos[signerIndex].signatureAlgorithm = result.signatureAlgorithm;
    }); //endregion
    //region Create TBS data for signing

    sequence = sequence.then(() => {
      if ("signedAttrs" in this.signerInfos[signerIndex]) {
        if (this.signerInfos[signerIndex].signedAttrs.encodedValue.byteLength !== 0) data = this.signerInfos[signerIndex].signedAttrs.encodedValue;else {
          data = this.signerInfos[signerIndex].signedAttrs.toSchema(true).toBER(false); //region Change type from "[0]" to "SET" acordingly to standard

          const view = new Uint8Array(data);
          view[0] = 0x31; //endregion
        }
      } else {
        if ("eContent" in this.encapContentInfo) // Attached data
          {
            if (this.encapContentInfo.eContent.idBlock.tagClass === 1 && this.encapContentInfo.eContent.idBlock.tagNumber === 4) {
              if (this.encapContentInfo.eContent.idBlock.isConstructed === false) data = this.encapContentInfo.eContent.valueBlock.valueHex;else {
                var _iterator7 = _createForOfIteratorHelper(this.encapContentInfo.eContent.valueBlock.value),
                    _step7;

                try {
                  for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                    const content = _step7.value;
                    data = (0, _pvutils.utilConcatBuf)(data, content.valueBlock.valueHex);
                  }
                } catch (err) {
                  _iterator7.e(err);
                } finally {
                  _iterator7.f();
                }
              }
            } else data = this.encapContentInfo.eContent.valueBlock.valueBeforeDecode;
          } else // Detached data
          {
            if (data.byteLength === 0) // Check that "data" already provided by function parameter
              return Promise.reject("Missed detached data input array");
          }
      }

      return Promise.resolve();
    }); //endregion
    //region Signing TBS data on provided private key

    sequence = sequence.then(() => engine.subtle.signWithPrivateKey(data, privateKey, parameters));
    sequence = sequence.then(result => {
      this.signerInfos[signerIndex].signature = new asn1js.OctetString({
        valueHex: result
      });
      return result;
    }); //endregion

    return sequence;
  } //**********************************************************************************


} //**************************************************************************************


exports.default = SignedData;
//# sourceMappingURL=SignedData.js.map