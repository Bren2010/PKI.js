"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var asn1js = _interopRequireWildcard(require("asn1js"));

var _pvutils = require("pvutils");

var _common = require("./common.js");

var _AlgorithmIdentifier = _interopRequireDefault(require("./AlgorithmIdentifier.js"));

var _RelativeDistinguishedNames = _interopRequireDefault(require("./RelativeDistinguishedNames.js"));

var _Time = _interopRequireDefault(require("./Time.js"));

var _PublicKeyInfo = _interopRequireDefault(require("./PublicKeyInfo.js"));

var _Extension = _interopRequireDefault(require("./Extension.js"));

var _Extensions = _interopRequireDefault(require("./Extensions.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//**************************************************************************************
function tbsCertificate(parameters = {}) {
  //TBSCertificate  ::=  SEQUENCE  {
  //    version         [0]  EXPLICIT Version DEFAULT v1,
  //    serialNumber         CertificateSerialNumber,
  //    signature            AlgorithmIdentifier,
  //    issuer               Name,
  //    validity             Validity,
  //    subject              Name,
  //    subjectPublicKeyInfo SubjectPublicKeyInfo,
  //    issuerUniqueID  [1]  IMPLICIT UniqueIdentifier OPTIONAL,
  //                         -- If present, version MUST be v2 or v3
  //    subjectUniqueID [2]  IMPLICIT UniqueIdentifier OPTIONAL,
  //                         -- If present, version MUST be v2 or v3
  //    extensions      [3]  EXPLICIT Extensions OPTIONAL
  //    -- If present, version MUST be v3
  //}

  /**
   * @type {Object}
   * @property {string} [blockName]
   * @property {string} [tbsCertificateVersion]
   * @property {string} [tbsCertificateSerialNumber]
   * @property {string} [signature]
   * @property {string} [issuer]
   * @property {string} [tbsCertificateValidity]
   * @property {string} [notBefore]
   * @property {string} [notAfter]
   * @property {string} [subject]
   * @property {string} [subjectPublicKeyInfo]
   * @property {string} [tbsCertificateIssuerUniqueID]
   * @property {string} [tbsCertificateSubjectUniqueID]
   * @property {string} [extensions]
   */
  const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
  return new asn1js.Sequence({
    name: names.blockName || "tbsCertificate",
    value: [new asn1js.Constructed({
      optional: true,
      idBlock: {
        tagClass: 3,
        // CONTEXT-SPECIFIC
        tagNumber: 0 // [0]

      },
      value: [new asn1js.Integer({
        name: names.tbsCertificateVersion || "tbsCertificate.version"
      }) // EXPLICIT integer value
      ]
    }), new asn1js.Integer({
      name: names.tbsCertificateSerialNumber || "tbsCertificate.serialNumber"
    }), _AlgorithmIdentifier.default.schema(names.signature || {
      names: {
        blockName: "tbsCertificate.signature"
      }
    }), _RelativeDistinguishedNames.default.schema(names.issuer || {
      names: {
        blockName: "tbsCertificate.issuer"
      }
    }), new asn1js.Sequence({
      name: names.tbsCertificateValidity || "tbsCertificate.validity",
      value: [_Time.default.schema(names.notBefore || {
        names: {
          utcTimeName: "tbsCertificate.notBefore",
          generalTimeName: "tbsCertificate.notBefore"
        }
      }), _Time.default.schema(names.notAfter || {
        names: {
          utcTimeName: "tbsCertificate.notAfter",
          generalTimeName: "tbsCertificate.notAfter"
        }
      })]
    }), _RelativeDistinguishedNames.default.schema(names.subject || {
      names: {
        blockName: "tbsCertificate.subject"
      }
    }), _PublicKeyInfo.default.schema(names.subjectPublicKeyInfo || {
      names: {
        blockName: "tbsCertificate.subjectPublicKeyInfo"
      }
    }), new asn1js.Primitive({
      name: names.tbsCertificateIssuerUniqueID || "tbsCertificate.issuerUniqueID",
      optional: true,
      idBlock: {
        tagClass: 3,
        // CONTEXT-SPECIFIC
        tagNumber: 1 // [1]

      }
    }), // IMPLICIT bistring value
    new asn1js.Primitive({
      name: names.tbsCertificateSubjectUniqueID || "tbsCertificate.subjectUniqueID",
      optional: true,
      idBlock: {
        tagClass: 3,
        // CONTEXT-SPECIFIC
        tagNumber: 2 // [2]

      }
    }), // IMPLICIT bistring value
    new asn1js.Constructed({
      optional: true,
      idBlock: {
        tagClass: 3,
        // CONTEXT-SPECIFIC
        tagNumber: 3 // [3]

      },
      value: [_Extensions.default.schema(names.extensions || {
        names: {
          blockName: "tbsCertificate.extensions"
        }
      })]
    }) // EXPLICIT SEQUENCE value
    ]
  });
} //**************************************************************************************

/**
 * Class from RFC5280
 */


class Certificate {
  //**********************************************************************************

  /**
   * Constructor for Certificate class
   * @param {Object} [parameters={}]
   * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
   */
  constructor(parameters = {}) {
    //region Internal properties of the object

    /**
     * @type {ArrayBuffer}
     * @desc ToBeSigned (TBS) part of the certificate
     */
    this.tbs = (0, _pvutils.getParametersValue)(parameters, "tbs", Certificate.defaultValues("tbs"));
    /**
     * @type {number}
     * @desc Version number
     */

    this.version = (0, _pvutils.getParametersValue)(parameters, "version", Certificate.defaultValues("version"));
    /**
     * @type {Integer}
     * @desc Serial number of the certificate
     */

    this.serialNumber = (0, _pvutils.getParametersValue)(parameters, "serialNumber", Certificate.defaultValues("serialNumber"));
    /**
     * @type {AlgorithmIdentifier}
     * @desc This field contains the algorithm identifier for the algorithm used by the CA to sign the certificate
     */

    this.signature = (0, _pvutils.getParametersValue)(parameters, "signature", Certificate.defaultValues("signature"));
    /**
     * @type {RelativeDistinguishedNames}
     * @desc The issuer field identifies the entity that has signed and issued the certificate
     */

    this.issuer = (0, _pvutils.getParametersValue)(parameters, "issuer", Certificate.defaultValues("issuer"));
    /**
     * @type {Time}
     * @desc The date on which the certificate validity period begins
     */

    this.notBefore = (0, _pvutils.getParametersValue)(parameters, "notBefore", Certificate.defaultValues("notBefore"));
    /**
     * @type {Time}
     * @desc The date on which the certificate validity period ends
     */

    this.notAfter = (0, _pvutils.getParametersValue)(parameters, "notAfter", Certificate.defaultValues("notAfter"));
    /**
     * @type {RelativeDistinguishedNames}
     * @desc The subject field identifies the entity associated with the public key stored in the subject public key field
     */

    this.subject = (0, _pvutils.getParametersValue)(parameters, "subject", Certificate.defaultValues("subject"));
    /**
     * @type {PublicKeyInfo}
     * @desc This field is used to carry the public key and identify the algorithm with which the key is used
     */

    this.subjectPublicKeyInfo = (0, _pvutils.getParametersValue)(parameters, "subjectPublicKeyInfo", Certificate.defaultValues("subjectPublicKeyInfo"));
    if ("issuerUniqueID" in parameters)
      /**
       * @type {ArrayBuffer}
       * @desc The subject and issuer unique identifiers are present in the certificate to handle the possibility of reuse of subject and/or issuer names over time
       */
      this.issuerUniqueID = (0, _pvutils.getParametersValue)(parameters, "issuerUniqueID", Certificate.defaultValues("issuerUniqueID"));
    if ("subjectUniqueID" in parameters)
      /**
       * @type {ArrayBuffer}
       * @desc The subject and issuer unique identifiers are present in the certificate to handle the possibility of reuse of subject and/or issuer names over time
       */
      this.subjectUniqueID = (0, _pvutils.getParametersValue)(parameters, "subjectUniqueID", Certificate.defaultValues("subjectUniqueID"));
    if ("extensions" in parameters)
      /**
       * @type {Array}
       * @desc If present, this field is a SEQUENCE of one or more certificate extensions
       */
      this.extensions = (0, _pvutils.getParametersValue)(parameters, "extensions", Certificate.defaultValues("extensions"));
    /**
     * @type {AlgorithmIdentifier}
     * @desc The signatureAlgorithm field contains the identifier for the cryptographic algorithm used by the CA to sign this certificate
     */

    this.signatureAlgorithm = (0, _pvutils.getParametersValue)(parameters, "signatureAlgorithm", Certificate.defaultValues("signatureAlgorithm"));
    /**
     * @type {BitString}
     * @desc The signatureValue field contains a digital signature computed upon the ASN.1 DER encoded tbsCertificate
     */

    this.signatureValue = (0, _pvutils.getParametersValue)(parameters, "signatureValue", Certificate.defaultValues("signatureValue")); //endregion
    //region If input argument array contains "schema" for this object

    if ("schema" in parameters) this.fromSchema(parameters.schema); //endregion
  } //**********************************************************************************

  /**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


  static defaultValues(memberName) {
    switch (memberName) {
      case "tbs":
        return new ArrayBuffer(0);

      case "version":
        return 0;

      case "serialNumber":
        return new asn1js.Integer();

      case "signature":
        return new _AlgorithmIdentifier.default();

      case "issuer":
        return new _RelativeDistinguishedNames.default();

      case "notBefore":
        return new _Time.default();

      case "notAfter":
        return new _Time.default();

      case "subject":
        return new _RelativeDistinguishedNames.default();

      case "subjectPublicKeyInfo":
        return new _PublicKeyInfo.default();

      case "issuerUniqueID":
        return new ArrayBuffer(0);

      case "subjectUniqueID":
        return new ArrayBuffer(0);

      case "extensions":
        return [];

      case "signatureAlgorithm":
        return new _AlgorithmIdentifier.default();

      case "signatureValue":
        return new asn1js.BitString();

      default:
        throw new Error(`Invalid member name for Certificate class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Return value of pre-defined ASN.1 schema for current class
   *
   * ASN.1 schema:
   * ```asn1
   * Certificate  ::=  SEQUENCE  {
   *    tbsCertificate       TBSCertificate,
   *    signatureAlgorithm   AlgorithmIdentifier,
   *    signatureValue       BIT STRING  }
   * ```
   *
   * @param {Object} parameters Input parameters for the schema
   * @returns {Object} asn1js schema object
   */


  static schema(parameters = {}) {
    /**
     * @type {Object}
     * @property {string} [blockName]
     * @property {string} [tbsCertificate]
     * @property {string} [signatureAlgorithm]
     * @property {string} [signatureValue]
     */
    const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
    return new asn1js.Sequence({
      name: names.blockName || "",
      value: [tbsCertificate(names.tbsCertificate), _AlgorithmIdentifier.default.schema(names.signatureAlgorithm || {
        names: {
          blockName: "signatureAlgorithm"
        }
      }), new asn1js.BitString({
        name: names.signatureValue || "signatureValue"
      })]
    });
  } //**********************************************************************************

  /**
   * Convert parsed asn1js object into current class
   * @param {!Object} schema
   */


  fromSchema(schema) {
    //region Clear input data first
    (0, _pvutils.clearProps)(schema, ["tbsCertificate", "tbsCertificate.extensions", "tbsCertificate.version", "tbsCertificate.serialNumber", "tbsCertificate.signature", "tbsCertificate.issuer", "tbsCertificate.notBefore", "tbsCertificate.notAfter", "tbsCertificate.subject", "tbsCertificate.subjectPublicKeyInfo", "tbsCertificate.issuerUniqueID", "tbsCertificate.subjectUniqueID", "signatureAlgorithm", "signatureValue"]); //endregion
    //region Check the schema is valid

    const asn1 = asn1js.compareSchema(schema, schema, Certificate.schema({
      names: {
        tbsCertificate: {
          names: {
            extensions: {
              names: {
                extensions: "tbsCertificate.extensions"
              }
            }
          }
        }
      }
    }));
    if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for Certificate"); //endregion
    //region Get internal properties from parsed schema

    this.tbs = asn1.result.tbsCertificate.valueBeforeDecode;
    if ("tbsCertificate.version" in asn1.result) this.version = asn1.result["tbsCertificate.version"].valueBlock.valueDec;
    this.serialNumber = asn1.result["tbsCertificate.serialNumber"];
    this.signature = new _AlgorithmIdentifier.default({
      schema: asn1.result["tbsCertificate.signature"]
    });
    this.issuer = new _RelativeDistinguishedNames.default({
      schema: asn1.result["tbsCertificate.issuer"]
    });
    this.notBefore = new _Time.default({
      schema: asn1.result["tbsCertificate.notBefore"]
    });
    this.notAfter = new _Time.default({
      schema: asn1.result["tbsCertificate.notAfter"]
    });
    this.subject = new _RelativeDistinguishedNames.default({
      schema: asn1.result["tbsCertificate.subject"]
    });
    this.subjectPublicKeyInfo = new _PublicKeyInfo.default({
      schema: asn1.result["tbsCertificate.subjectPublicKeyInfo"]
    });
    if ("tbsCertificate.issuerUniqueID" in asn1.result) this.issuerUniqueID = asn1.result["tbsCertificate.issuerUniqueID"].valueBlock.valueHex;
    if ("tbsCertificate.subjectUniqueID" in asn1.result) this.subjectUniqueID = asn1.result["tbsCertificate.subjectUniqueID"].valueBlock.valueHex;
    if ("tbsCertificate.extensions" in asn1.result) this.extensions = Array.from(asn1.result["tbsCertificate.extensions"], element => new _Extension.default({
      schema: element
    }));
    this.signatureAlgorithm = new _AlgorithmIdentifier.default({
      schema: asn1.result.signatureAlgorithm
    });
    this.signatureValue = asn1.result.signatureValue; //endregion
  } //**********************************************************************************

  /**
   * Create ASN.1 schema for existing values of TBS part for the certificate
   */


  encodeTBS() {
    //region Create array for output sequence
    const outputArray = [];

    if ("version" in this && this.version !== Certificate.defaultValues("version")) {
      outputArray.push(new asn1js.Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          // CONTEXT-SPECIFIC
          tagNumber: 0 // [0]

        },
        value: [new asn1js.Integer({
          value: this.version
        }) // EXPLICIT integer value
        ]
      }));
    }

    outputArray.push(this.serialNumber);
    outputArray.push(this.signature.toSchema());
    outputArray.push(this.issuer.toSchema());
    outputArray.push(new asn1js.Sequence({
      value: [this.notBefore.toSchema(), this.notAfter.toSchema()]
    }));
    outputArray.push(this.subject.toSchema());
    outputArray.push(this.subjectPublicKeyInfo.toSchema());

    if ("issuerUniqueID" in this) {
      outputArray.push(new asn1js.Primitive({
        optional: true,
        idBlock: {
          tagClass: 3,
          // CONTEXT-SPECIFIC
          tagNumber: 1 // [1]

        },
        valueHex: this.issuerUniqueID
      }));
    }

    if ("subjectUniqueID" in this) {
      outputArray.push(new asn1js.Primitive({
        optional: true,
        idBlock: {
          tagClass: 3,
          // CONTEXT-SPECIFIC
          tagNumber: 2 // [2]

        },
        valueHex: this.subjectUniqueID
      }));
    }

    if ("extensions" in this) {
      outputArray.push(new asn1js.Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          // CONTEXT-SPECIFIC
          tagNumber: 3 // [3]

        },
        value: [new asn1js.Sequence({
          value: Array.from(this.extensions, element => element.toSchema())
        })]
      }));
    } //endregion
    //region Create and return output sequence


    return new asn1js.Sequence({
      value: outputArray
    }); //endregion
  } //**********************************************************************************

  /**
   * Convert current object to asn1js object and set correct values
   * @returns {Object} asn1js object
   */


  toSchema(encodeFlag = false) {
    let tbsSchema = {}; //region Decode stored TBS value

    if (encodeFlag === false) {
      if (this.tbs.length === 0) // No stored certificate TBS part
        return Certificate.schema().value[0];
      tbsSchema = asn1js.fromBER(this.tbs).result;
    } //endregion
    //region Create TBS schema via assembling from TBS parts
    else tbsSchema = this.encodeTBS(); //endregion
    //region Construct and return new ASN.1 schema for this object


    return new asn1js.Sequence({
      value: [tbsSchema, this.signatureAlgorithm.toSchema(), this.signatureValue]
    }); //endregion
  } //**********************************************************************************

  /**
   * Convertion for the class to JSON object
   * @returns {Object}
   */


  toJSON() {
    const object = {
      tbs: (0, _pvutils.bufferToHexCodes)(this.tbs, 0, this.tbs.byteLength),
      serialNumber: this.serialNumber.toJSON(),
      signature: this.signature.toJSON(),
      issuer: this.issuer.toJSON(),
      notBefore: this.notBefore.toJSON(),
      notAfter: this.notAfter.toJSON(),
      subject: this.subject.toJSON(),
      subjectPublicKeyInfo: this.subjectPublicKeyInfo.toJSON(),
      signatureAlgorithm: this.signatureAlgorithm.toJSON(),
      signatureValue: this.signatureValue.toJSON()
    };
    if ("version" in this && this.version !== Certificate.defaultValues("version")) object.version = this.version;
    if ("issuerUniqueID" in this) object.issuerUniqueID = (0, _pvutils.bufferToHexCodes)(this.issuerUniqueID, 0, this.issuerUniqueID.byteLength);
    if ("subjectUniqueID" in this) object.subjectUniqueID = (0, _pvutils.bufferToHexCodes)(this.subjectUniqueID, 0, this.subjectUniqueID.byteLength);
    if ("extensions" in this) object.extensions = Array.from(this.extensions, element => element.toJSON());
    return object;
  } //**********************************************************************************

  /**
   * Importing public key for current certificate
   */


  getPublicKey(parameters = null) {
    return (0, _common.getEngine)().subtle.getPublicKey(this.subjectPublicKeyInfo, this.signatureAlgorithm, parameters);
  } //**********************************************************************************

  /**
   * Get hash value for subject public key (default SHA-1)
   * @param {String} [hashAlgorithm=SHA-1] Hashing algorithm name
   */


  getKeyHash(hashAlgorithm = "SHA-1") {
    //region Get a "crypto" extension
    const crypto = (0, _common.getCrypto)();
    if (typeof crypto === "undefined") return Promise.reject("Unable to create WebCrypto object"); //endregion

    return crypto.digest({
      name: hashAlgorithm
    }, new Uint8Array(this.subjectPublicKeyInfo.subjectPublicKey.valueBlock.valueHex));
  } //**********************************************************************************

  /**
   * Make a signature for current value from TBS section
   * @param {Object} privateKey Private key for "subjectPublicKeyInfo" structure
   * @param {string} [hashAlgorithm="SHA-1"] Hashing algorithm
   */


  sign(privateKey, hashAlgorithm = "SHA-1") {
    //region Initial checking
    //region Check private key
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
      this.signature = result.signatureAlgorithm;
      this.signatureAlgorithm = result.signatureAlgorithm;
    }); //endregion
    //region Create TBS data for signing

    sequence = sequence.then(() => {
      this.tbs = this.encodeTBS().toBER(false);
    }); //endregion
    //region Signing TBS data on provided private key

    sequence = sequence.then(() => engine.subtle.signWithPrivateKey(this.tbs, privateKey, parameters));
    sequence = sequence.then(result => {
      this.signatureValue = new asn1js.BitString({
        valueHex: result
      });
    }); //endregion

    return sequence;
  } //**********************************************************************************


  verify(issuerCertificate = null) {
    //region Global variables
    let subjectPublicKeyInfo = {}; //endregion
    //region Set correct "subjectPublicKeyInfo" value

    if (issuerCertificate !== null) subjectPublicKeyInfo = issuerCertificate.subjectPublicKeyInfo;else {
      if (this.issuer.isEqual(this.subject)) // Self-signed certificate
        subjectPublicKeyInfo = this.subjectPublicKeyInfo;
    }
    if (subjectPublicKeyInfo instanceof _PublicKeyInfo.default === false) return Promise.reject("Please provide issuer certificate as a parameter"); //endregion

    return (0, _common.getEngine)().subtle.verifyWithPublicKey(this.tbs, this.signatureValue, subjectPublicKeyInfo, this.signatureAlgorithm);
  } //**********************************************************************************


} //**************************************************************************************


exports.default = Certificate;
//# sourceMappingURL=Certificate.js.map