"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var asn1js = _interopRequireWildcard(require("asn1js"));

var _pvutils = require("pvutils");

var _common = require("./common.js");

var _ResponseData = _interopRequireDefault(require("./ResponseData.js"));

var _AlgorithmIdentifier = _interopRequireDefault(require("./AlgorithmIdentifier.js"));

var _Certificate = _interopRequireDefault(require("./Certificate.js"));

var _CertID = _interopRequireDefault(require("./CertID.js"));

var _RelativeDistinguishedNames = _interopRequireDefault(require("./RelativeDistinguishedNames.js"));

var _CertificateChainValidationEngine = _interopRequireDefault(require("./CertificateChainValidationEngine.js"));

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
 * Class from RFC6960
 */
class BasicOCSPResponse {
  //**********************************************************************************

  /**
   * Constructor for BasicOCSPResponse class
   * @param {Object} [parameters={}]
   * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
   */
  constructor(parameters = {}) {
    //region Internal properties of the object

    /**
     * @type {ResponseData}
     * @desc tbsResponseData
     */
    this.tbsResponseData = (0, _pvutils.getParametersValue)(parameters, "tbsResponseData", BasicOCSPResponse.defaultValues("tbsResponseData"));
    /**
     * @type {AlgorithmIdentifier}
     * @desc signatureAlgorithm
     */

    this.signatureAlgorithm = (0, _pvutils.getParametersValue)(parameters, "signatureAlgorithm", BasicOCSPResponse.defaultValues("signatureAlgorithm"));
    /**
     * @type {BitString}
     * @desc signature
     */

    this.signature = (0, _pvutils.getParametersValue)(parameters, "signature", BasicOCSPResponse.defaultValues("signature"));
    if ("certs" in parameters)
      /**
       * @type {Array.<Certificate>}
       * @desc certs
       */
      this.certs = (0, _pvutils.getParametersValue)(parameters, "certs", BasicOCSPResponse.defaultValues("certs")); //endregion
    //region If input argument array contains "schema" for this object

    if ("schema" in parameters) this.fromSchema(parameters.schema); //endregion
  } //**********************************************************************************

  /**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


  static defaultValues(memberName) {
    switch (memberName) {
      case "tbsResponseData":
        return new _ResponseData.default();

      case "signatureAlgorithm":
        return new _AlgorithmIdentifier.default();

      case "signature":
        return new asn1js.BitString();

      case "certs":
        return [];

      default:
        throw new Error(`Invalid member name for BasicOCSPResponse class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Compare values with default values for all class members
   * @param {string} memberName String name for a class member
   * @param {*} memberValue Value to compare with default value
   */


  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case "type":
        {
          // noinspection OverlyComplexBooleanExpressionJS
          let comparisonResult = _ResponseData.default.compareWithDefault("tbs", memberValue.tbs) && _ResponseData.default.compareWithDefault("responderID", memberValue.responderID) && _ResponseData.default.compareWithDefault("producedAt", memberValue.producedAt) && _ResponseData.default.compareWithDefault("responses", memberValue.responses);

          if ("responseExtensions" in memberValue) comparisonResult = comparisonResult && _ResponseData.default.compareWithDefault("responseExtensions", memberValue.responseExtensions);
          return comparisonResult;
        }

      case "signatureAlgorithm":
        return memberValue.algorithmId === "" && "algorithmParams" in memberValue === false;

      case "signature":
        return memberValue.isEqual(BasicOCSPResponse.defaultValues(memberName));

      case "certs":
        return memberValue.length === 0;

      default:
        throw new Error(`Invalid member name for BasicOCSPResponse class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Return value of pre-defined ASN.1 schema for current class
   *
   * ASN.1 schema:
   * ```asn1
   * BasicOCSPResponse       ::= SEQUENCE {
   *    tbsResponseData      ResponseData,
   *    signatureAlgorithm   AlgorithmIdentifier,
   *    signature            BIT STRING,
   *    certs            [0] EXPLICIT SEQUENCE OF Certificate OPTIONAL }
   * ```
   *
   * @param {Object} parameters Input parameters for the schema
   * @returns {Object} asn1js schema object
   */


  static schema(parameters = {}) {
    /**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [tbsResponseData]
     * @property {string} [signatureAlgorithm]
     * @property {string} [signature]
     * @property {string} [certs]
     */
    const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
    return new asn1js.Sequence({
      name: names.blockName || "BasicOCSPResponse",
      value: [_ResponseData.default.schema(names.tbsResponseData || {
        names: {
          blockName: "BasicOCSPResponse.tbsResponseData"
        }
      }), _AlgorithmIdentifier.default.schema(names.signatureAlgorithm || {
        names: {
          blockName: "BasicOCSPResponse.signatureAlgorithm"
        }
      }), new asn1js.BitString({
        name: names.signature || "BasicOCSPResponse.signature"
      }), new asn1js.Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          // CONTEXT-SPECIFIC
          tagNumber: 0 // [0]

        },
        value: [new asn1js.Sequence({
          value: [new asn1js.Repeated({
            name: "BasicOCSPResponse.certs",
            value: _Certificate.default.schema(names.certs || {})
          })]
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
    (0, _pvutils.clearProps)(schema, ["BasicOCSPResponse.tbsResponseData", "BasicOCSPResponse.signatureAlgorithm", "BasicOCSPResponse.signature", "BasicOCSPResponse.certs"]); //endregion
    //region Check the schema is valid

    const asn1 = asn1js.compareSchema(schema, schema, BasicOCSPResponse.schema());
    if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for BasicOCSPResponse"); //endregion
    //region Get internal properties from parsed schema

    this.tbsResponseData = new _ResponseData.default({
      schema: asn1.result["BasicOCSPResponse.tbsResponseData"]
    });
    this.signatureAlgorithm = new _AlgorithmIdentifier.default({
      schema: asn1.result["BasicOCSPResponse.signatureAlgorithm"]
    });
    this.signature = asn1.result["BasicOCSPResponse.signature"];
    if ("BasicOCSPResponse.certs" in asn1.result) this.certs = Array.from(asn1.result["BasicOCSPResponse.certs"], element => new _Certificate.default({
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
    outputArray.push(this.tbsResponseData.toSchema());
    outputArray.push(this.signatureAlgorithm.toSchema());
    outputArray.push(this.signature); //region Create array of certificates

    if ("certs" in this) {
      outputArray.push(new asn1js.Constructed({
        idBlock: {
          tagClass: 3,
          // CONTEXT-SPECIFIC
          tagNumber: 0 // [0]

        },
        value: [new asn1js.Sequence({
          value: Array.from(this.certs, element => element.toSchema())
        })]
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
      tbsResponseData: this.tbsResponseData.toJSON(),
      signatureAlgorithm: this.signatureAlgorithm.toJSON(),
      signature: this.signature.toJSON()
    };
    if ("certs" in this) _object.certs = Array.from(this.certs, element => element.toJSON());
    return _object;
  } //**********************************************************************************

  /**
   * Get OCSP response status for specific certificate
   * @param {Certificate} certificate Certificate to be checked
   * @param {Certificate} issuerCertificate Certificate of issuer for certificate to be checked
   * @returns {Promise}
   */


  getCertificateStatus(certificate, issuerCertificate) {
    //region Initial variables
    let sequence = Promise.resolve();
    const result = {
      isForCertificate: false,
      status: 2 // 0 = good, 1 = revoked, 2 = unknown

    };
    const hashesObject = {};
    const certIDs = [];
    const certIDPromises = []; //endregion
    //region Create all "certIDs" for input certificates

    var _iterator = _createForOfIteratorHelper(this.tbsResponseData.responses),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        const response = _step.value;
        const hashAlgorithm = (0, _common.getAlgorithmByOID)(response.certID.hashAlgorithm.algorithmId);
        if ("name" in hashAlgorithm === false) return Promise.reject(`Wrong CertID hashing algorithm: ${response.certID.hashAlgorithm.algorithmId}`);

        if (hashAlgorithm.name in hashesObject === false) {
          hashesObject[hashAlgorithm.name] = 1;
          const certID = new _CertID.default();
          certIDs.push(certID);
          certIDPromises.push(certID.createForCertificate(certificate, {
            hashAlgorithm: hashAlgorithm.name,
            issuerCertificate
          }));
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    sequence = sequence.then(() => Promise.all(certIDPromises)); //endregion
    //region Compare all response's "certIDs" with identifiers for input certificate

    sequence = sequence.then(() => {
      var _iterator2 = _createForOfIteratorHelper(this.tbsResponseData.responses),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          const response = _step2.value;

          var _iterator3 = _createForOfIteratorHelper(certIDs),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              const id = _step3.value;

              if (response.certID.isEqual(id)) {
                result.isForCertificate = true;

                try {
                  switch (response.certStatus.idBlock.isConstructed) {
                    case true:
                      if (response.certStatus.idBlock.tagNumber === 1) result.status = 1; // revoked

                      break;

                    case false:
                      switch (response.certStatus.idBlock.tagNumber) {
                        case 0:
                          // good
                          result.status = 0;
                          break;

                        case 2:
                          // unknown
                          result.status = 2;
                          break;

                        default:
                      }

                      break;

                    default:
                  }
                } catch (ex) {}

                return result;
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return result;
    }); //endregion

    return sequence;
  } //**********************************************************************************

  /**
   * Make signature for current OCSP Basic Response
   * @param {Object} privateKey Private key for "subjectPublicKeyInfo" structure
   * @param {string} [hashAlgorithm="SHA-1"] Hashing algorithm. Default SHA-1
   * @returns {Promise}
   */


  sign(privateKey, hashAlgorithm = "SHA-1") {
    //region Initial checking
    //region Get a private key from function parameter
    if (typeof privateKey === "undefined") return Promise.reject("Need to provide a private key for signing"); //endregion
    //endregion
    //region Initial variables

    let sequence = Promise.resolve();
    let parameters;
    const engine = (0, _common.getEngine)(); //endregion
    //region Get a "default parameters" for current algorithm and set correct signature algorithm

    sequence = sequence.then(() => engine.subtle.getSignatureParameters(privateKey, hashAlgorithm));
    sequence = sequence.then(result => {
      parameters = result.parameters;
      this.signatureAlgorithm = result.signatureAlgorithm;
    }); //endregion
    //region Create TBS data for signing

    sequence = sequence.then(() => {
      this.tbsResponseData.tbs = this.tbsResponseData.toSchema(true).toBER(false);
    }); //endregion
    //region Signing TBS data on provided private key

    sequence = sequence.then(() => engine.subtle.signWithPrivateKey(this.tbsResponseData.tbs, privateKey, parameters));
    sequence = sequence.then(result => {
      this.signature = new asn1js.BitString({
        valueHex: result
      });
    }); //endregion

    return sequence;
  } //**********************************************************************************

  /**
   * Verify existing OCSP Basic Response
   * @param {Object} parameters Additional parameters
   * @returns {Promise}
   */


  verify(parameters = {}) {
    //region Initial variables
    let signerCert = null;
    let certIndex = -1;
    let sequence = Promise.resolve();
    let trustedCerts = [];

    const _this = this;

    const engine = (0, _common.getEngine)(); //endregion
    //region Check amount of certificates

    if ("certs" in this === false) return Promise.reject("No certificates attached to the BasicOCSPResponce"); //endregion
    //region Get input values

    if ("trustedCerts" in parameters) trustedCerts = parameters.trustedCerts; //endregion
    //region Aux functions

    /**
     * Check CA flag for the certificate
     * @param {Certificate} cert Certificate to find CA flag for
     * @returns {*}
     */

    function checkCA(cert) {
      //region Do not include signer's certificate
      if (cert.issuer.isEqual(signerCert.issuer) === true && cert.serialNumber.isEqual(signerCert.serialNumber) === true) return null; //endregion

      let isCA = false;

      var _iterator4 = _createForOfIteratorHelper(cert.extensions),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          const extension = _step4.value;

          if (extension.extnID === "2.5.29.19") // BasicConstraints
            {
              if ("cA" in extension.parsedValue) {
                if (extension.parsedValue.cA === true) isCA = true;
              }
            }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      if (isCA) return cert;
      return null;
    } //endregion
    //region Get a "crypto" extension


    const crypto = (0, _common.getCrypto)();
    if (typeof crypto === "undefined") return Promise.reject("Unable to create WebCrypto object"); //endregion
    //region Find correct value for "responderID"

    switch (true) {
      case this.tbsResponseData.responderID instanceof _RelativeDistinguishedNames.default:
        // [1] Name
        sequence = sequence.then(() => {
          var _iterator5 = _createForOfIteratorHelper(_this.certs.entries()),
              _step5;

          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              const _step5$value = _slicedToArray(_step5.value, 2),
                    index = _step5$value[0],
                    certificate = _step5$value[1];

              if (certificate.subject.isEqual(_this.tbsResponseData.responderID)) {
                certIndex = index;
                break;
              }
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
        });
        break;

      case this.tbsResponseData.responderID instanceof asn1js.OctetString:
        // [2] KeyHash
        sequence = sequence.then(() => Promise.all(Array.from(_this.certs, element => crypto.digest({
          name: "sha-1"
        }, new Uint8Array(element.subjectPublicKeyInfo.subjectPublicKey.valueBlock.valueHex)))).then(results => {
          var _iterator6 = _createForOfIteratorHelper(_this.certs.entries()),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              const _step6$value = _slicedToArray(_step6.value, 1),
                    index = _step6$value[0];

              if ((0, _pvutils.isEqualBuffer)(results[index], _this.tbsResponseData.responderID.valueBlock.valueHex)) {
                certIndex = index;
                break;
              }
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
        }));
        break;

      default:
        return Promise.reject("Wrong value for responderID");
    } //endregion
    //region Make additional verification for signer's certificate


    sequence = sequence.then(() => {
      if (certIndex === -1) return Promise.reject("Correct certificate was not found in OCSP response");
      signerCert = this.certs[certIndex];
      return Promise.all(Array.from(_this.certs, element => checkCA(element))).then(promiseResults => {
        const additionalCerts = [];
        additionalCerts.push(signerCert);

        var _iterator7 = _createForOfIteratorHelper(promiseResults),
            _step7;

        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            const promiseResult = _step7.value;
            if (promiseResult !== null) additionalCerts.push(promiseResult);
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }

        const certChain = new _CertificateChainValidationEngine.default({
          certs: additionalCerts,
          trustedCerts
        });
        return certChain.verify().then(verificationResult => {
          if (verificationResult.result === true) return Promise.resolve();
          return Promise.reject("Validation of signer's certificate failed");
        }, error => Promise.reject(`Validation of signer's certificate failed with error: ${error instanceof Object ? error.resultMessage : error}`));
      }, promiseError => Promise.reject(`Error during checking certificates for CA flag: ${promiseError}`));
    }); //endregion

    sequence = sequence.then(() => engine.subtle.verifyWithPublicKey(this.tbsResponseData.tbs, this.signature, this.certs[certIndex].subjectPublicKeyInfo, this.signatureAlgorithm));
    return sequence;
  } //**********************************************************************************


} //**************************************************************************************


exports.default = BasicOCSPResponse;
//# sourceMappingURL=BasicOCSPResponse.js.map