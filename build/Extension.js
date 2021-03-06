"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var asn1js = _interopRequireWildcard(require("asn1js"));

var _pvutils = require("pvutils");

var _SubjectDirectoryAttributes = _interopRequireDefault(require("./SubjectDirectoryAttributes.js"));

var _PrivateKeyUsagePeriod = _interopRequireDefault(require("./PrivateKeyUsagePeriod.js"));

var _AltName = _interopRequireDefault(require("./AltName.js"));

var _BasicConstraints = _interopRequireDefault(require("./BasicConstraints.js"));

var _IssuingDistributionPoint = _interopRequireDefault(require("./IssuingDistributionPoint.js"));

var _GeneralNames = _interopRequireDefault(require("./GeneralNames.js"));

var _NameConstraints = _interopRequireDefault(require("./NameConstraints.js"));

var _CRLDistributionPoints = _interopRequireDefault(require("./CRLDistributionPoints.js"));

var _CertificatePolicies = _interopRequireDefault(require("./CertificatePolicies.js"));

var _PolicyMappings = _interopRequireDefault(require("./PolicyMappings.js"));

var _AuthorityKeyIdentifier = _interopRequireDefault(require("./AuthorityKeyIdentifier.js"));

var _PolicyConstraints = _interopRequireDefault(require("./PolicyConstraints.js"));

var _ExtKeyUsage = _interopRequireDefault(require("./ExtKeyUsage.js"));

var _InfoAccess = _interopRequireDefault(require("./InfoAccess.js"));

var _SignedCertificateTimestampList = _interopRequireDefault(require("./SignedCertificateTimestampList.js"));

var _CertificateTemplate = _interopRequireDefault(require("./CertificateTemplate.js"));

var _CAVersion = _interopRequireDefault(require("./CAVersion.js"));

var _QCStatements = _interopRequireDefault(require("./QCStatements.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//**************************************************************************************

/**
 * Class from RFC5280
 */
class Extension {
  //**********************************************************************************

  /**
   * Constructor for Extension class
   * @param {Object} [parameters={}]
   * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
   */
  constructor(parameters = {}) {
    //region Internal properties of the object

    /**
     * @type {string}
     * @desc extnID
     */
    this.extnID = (0, _pvutils.getParametersValue)(parameters, "extnID", Extension.defaultValues("extnID"));
    /**
     * @type {boolean}
     * @desc critical
     */

    this.critical = (0, _pvutils.getParametersValue)(parameters, "critical", Extension.defaultValues("critical"));
    /**
     * @type {OctetString}
     * @desc extnValue
     */

    if ("extnValue" in parameters) this.extnValue = new asn1js.OctetString({
      valueHex: parameters.extnValue
    });else this.extnValue = Extension.defaultValues("extnValue");
    if ("parsedValue" in parameters)
      /**
       * @type {Object}
       * @desc parsedValue
       */
      this.parsedValue = (0, _pvutils.getParametersValue)(parameters, "parsedValue", Extension.defaultValues("parsedValue")); //endregion
    //region If input argument array contains "schema" for this object

    if ("schema" in parameters) this.fromSchema(parameters.schema); //endregion
  } //**********************************************************************************

  /**
   * Return default values for all class members
   * @param {string} memberName String name for a class member
   */


  static defaultValues(memberName) {
    switch (memberName) {
      case "extnID":
        return "";

      case "critical":
        return false;

      case "extnValue":
        return new asn1js.OctetString();

      case "parsedValue":
        return {};

      default:
        throw new Error(`Invalid member name for Extension class: ${memberName}`);
    }
  } //**********************************************************************************

  /**
   * Return value of pre-defined ASN.1 schema for current class
   *
   * ASN.1 schema:
   * ```asn1
   * Extension  ::=  SEQUENCE  {
   *    extnID      OBJECT IDENTIFIER,
   *    critical    BOOLEAN DEFAULT FALSE,
   *    extnValue   OCTET STRING
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
     * @property {string} [extnID]
     * @property {string} [critical]
     * @property {string} [extnValue]
     */
    const names = (0, _pvutils.getParametersValue)(parameters, "names", {});
    return new asn1js.Sequence({
      name: names.blockName || "",
      value: [new asn1js.ObjectIdentifier({
        name: names.extnID || ""
      }), new asn1js.Boolean({
        name: names.critical || "",
        optional: true
      }), new asn1js.OctetString({
        name: names.extnValue || ""
      })]
    });
  } //**********************************************************************************

  /**
   * Convert parsed asn1js object into current class
   * @param {!Object} schema
   */


  fromSchema(schema) {
    //region Clear input data first
    (0, _pvutils.clearProps)(schema, ["extnID", "critical", "extnValue"]); //endregion
    //region Check the schema is valid

    let asn1 = asn1js.compareSchema(schema, schema, Extension.schema({
      names: {
        extnID: "extnID",
        critical: "critical",
        extnValue: "extnValue"
      }
    }));
    if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for Extension"); //endregion
    //region Get internal properties from parsed schema

    this.extnID = asn1.result.extnID.valueBlock.toString();
    if ("critical" in asn1.result) this.critical = asn1.result.critical.valueBlock.value;
    this.extnValue = asn1.result.extnValue; //region Get "parsedValue" for well-known extensions

    asn1 = asn1js.fromBER(this.extnValue.valueBlock.valueHex);
    if (asn1.offset === -1) return;

    switch (this.extnID) {
      case "2.5.29.9":
        // SubjectDirectoryAttributes
        try {
          this.parsedValue = new _SubjectDirectoryAttributes.default({
            schema: asn1.result
          });
        } catch (ex) {
          this.parsedValue = new _SubjectDirectoryAttributes.default();
          this.parsedValue.parsingError = "Incorrectly formated SubjectDirectoryAttributes";
        }

        break;

      case "2.5.29.14":
        // SubjectKeyIdentifier
        this.parsedValue = asn1.result; // Should be just a simple OCTETSTRING

        break;

      case "2.5.29.15":
        // KeyUsage
        this.parsedValue = asn1.result; // Should be just a simple BITSTRING

        break;

      case "2.5.29.16":
        // PrivateKeyUsagePeriod
        try {
          this.parsedValue = new _PrivateKeyUsagePeriod.default({
            schema: asn1.result
          });
        } catch (ex) {
          this.parsedValue = new _PrivateKeyUsagePeriod.default();
          this.parsedValue.parsingError = "Incorrectly formated PrivateKeyUsagePeriod";
        }

        break;

      case "2.5.29.17": // SubjectAltName

      case "2.5.29.18":
        // IssuerAltName
        try {
          this.parsedValue = new _AltName.default({
            schema: asn1.result
          });
        } catch (ex) {
          this.parsedValue = new _AltName.default();
          this.parsedValue.parsingError = "Incorrectly formated AltName";
        }

        break;

      case "2.5.29.19":
        // BasicConstraints
        try {
          this.parsedValue = new _BasicConstraints.default({
            schema: asn1.result
          });
        } catch (ex) {
          this.parsedValue = new _BasicConstraints.default();
          this.parsedValue.parsingError = "Incorrectly formated BasicConstraints";
        }

        break;

      case "2.5.29.20": // CRLNumber

      case "2.5.29.27":
        // BaseCRLNumber (delta CRL indicator)
        this.parsedValue = asn1.result; // Should be just a simple INTEGER

        break;

      case "2.5.29.21":
        // CRLReason
        this.parsedValue = asn1.result; // Should be just a simple ENUMERATED

        break;

      case "2.5.29.24":
        // InvalidityDate
        this.parsedValue = asn1.result; // Should be just a simple GeneralizedTime

        break;

      case "2.5.29.28":
        // IssuingDistributionPoint
        try {
          this.parsedValue = new _IssuingDistributionPoint.default({
            schema: asn1.result
          });
        } catch (ex) {
          this.parsedValue = new _IssuingDistributionPoint.default();
          this.parsedValue.parsingError = "Incorrectly formated IssuingDistributionPoint";
        }

        break;

      case "2.5.29.29":
        // CertificateIssuer
        try {
          this.parsedValue = new _GeneralNames.default({
            schema: asn1.result
          }); // Should be just a simple
        } catch (ex) {
          this.parsedValue = new _GeneralNames.default();
          this.parsedValue.parsingError = "Incorrectly formated GeneralNames";
        }

        break;

      case "2.5.29.30":
        // NameConstraints
        try {
          this.parsedValue = new _NameConstraints.default({
            schema: asn1.result
          });
        } catch (ex) {
          this.parsedValue = new _NameConstraints.default();
          this.parsedValue.parsingError = "Incorrectly formated NameConstraints";
        }

        break;

      case "2.5.29.31": // CRLDistributionPoints

      case "2.5.29.46":
        // FreshestCRL
        try {
          this.parsedValue = new _CRLDistributionPoints.default({
            schema: asn1.result
          });
        } catch (ex) {
          this.parsedValue = new _CRLDistributionPoints.default();
          this.parsedValue.parsingError = "Incorrectly formated CRLDistributionPoints";
        }

        break;

      case "2.5.29.32": // CertificatePolicies

      case "1.3.6.1.4.1.311.21.10":
        // szOID_APPLICATION_CERT_POLICIES - Microsoft-specific OID
        try {
          this.parsedValue = new _CertificatePolicies.default({
            schema: asn1.result
          });
        } catch (ex) {
          this.parsedValue = new _CertificatePolicies.default();
          this.parsedValue.parsingError = "Incorrectly formated CertificatePolicies";
        }

        break;

      case "2.5.29.33":
        // PolicyMappings
        try {
          this.parsedValue = new _PolicyMappings.default({
            schema: asn1.result
          });
        } catch (ex) {
          this.parsedValue = new _PolicyMappings.default();
          this.parsedValue.parsingError = "Incorrectly formated CertificatePolicies";
        }

        break;

      case "2.5.29.35":
        // AuthorityKeyIdentifier
        try {
          this.parsedValue = new _AuthorityKeyIdentifier.default({
            schema: asn1.result
          });
        } catch (ex) {
          this.parsedValue = new _AuthorityKeyIdentifier.default();
          this.parsedValue.parsingError = "Incorrectly formated AuthorityKeyIdentifier";
        }

        break;

      case "2.5.29.36":
        // PolicyConstraints
        try {
          this.parsedValue = new _PolicyConstraints.default({
            schema: asn1.result
          });
        } catch (ex) {
          this.parsedValue = new _PolicyConstraints.default();
          this.parsedValue.parsingError = "Incorrectly formated PolicyConstraints";
        }

        break;

      case "2.5.29.37":
        // ExtKeyUsage
        try {
          this.parsedValue = new _ExtKeyUsage.default({
            schema: asn1.result
          });
        } catch (ex) {
          this.parsedValue = new _ExtKeyUsage.default();
          this.parsedValue.parsingError = "Incorrectly formated ExtKeyUsage";
        }

        break;

      case "2.5.29.54":
        // InhibitAnyPolicy
        this.parsedValue = asn1.result; // Should be just a simple INTEGER

        break;

      case "1.3.6.1.5.5.7.1.1": // AuthorityInfoAccess

      case "1.3.6.1.5.5.7.1.11":
        // SubjectInfoAccess
        try {
          this.parsedValue = new _InfoAccess.default({
            schema: asn1.result
          });
        } catch (ex) {
          this.parsedValue = new _InfoAccess.default();
          this.parsedValue.parsingError = "Incorrectly formated InfoAccess";
        }

        break;

      case "1.3.6.1.4.1.11129.2.4.2":
        // SignedCertificateTimestampList
        try {
          this.parsedValue = new _SignedCertificateTimestampList.default({
            schema: asn1.result
          });
        } catch (ex) {
          this.parsedValue = new _SignedCertificateTimestampList.default();
          this.parsedValue.parsingError = "Incorrectly formated SignedCertificateTimestampList";
        }

        break;

      case "1.3.6.1.4.1.311.20.2":
        // szOID_ENROLL_CERTTYPE_EXTENSION - Microsoft-specific extension
        this.parsedValue = asn1.result; // Used to be simple Unicode string

        break;

      case "1.3.6.1.4.1.311.21.2":
        // szOID_CERTSRV_PREVIOUS_CERT_HASH - Microsoft-specific extension
        this.parsedValue = asn1.result; // Used to be simple OctetString

        break;

      case "1.3.6.1.4.1.311.21.7":
        // szOID_CERTIFICATE_TEMPLATE - Microsoft-specific extension
        try {
          this.parsedValue = new _CertificateTemplate.default({
            schema: asn1.result
          });
        } catch (ex) {
          this.parsedValue = new _CertificateTemplate.default();
          this.parsedValue.parsingError = "Incorrectly formated CertificateTemplate";
        }

        break;

      case "1.3.6.1.4.1.311.21.1":
        // szOID_CERTSRV_CA_VERSION - Microsoft-specific extension
        try {
          this.parsedValue = new _CAVersion.default({
            schema: asn1.result
          });
        } catch (ex) {
          this.parsedValue = new _CAVersion.default();
          this.parsedValue.parsingError = "Incorrectly formated CAVersion";
        }

        break;

      case "1.3.6.1.5.5.7.1.3":
        // QCStatements
        try {
          this.parsedValue = new _QCStatements.default({
            schema: asn1.result
          });
        } catch (ex) {
          this.parsedValue = new _QCStatements.default();
          this.parsedValue.parsingError = "Incorrectly formated QCStatements";
        }

        break;

      default:
    } //endregion
    //endregion

  } //**********************************************************************************

  /**
   * Convert current object to asn1js object and set correct values
   * @returns {Object} asn1js object
   */


  toSchema() {
    //region Create array for output sequence
    const outputArray = [];
    outputArray.push(new asn1js.ObjectIdentifier({
      value: this.extnID
    }));
    if (this.critical !== Extension.defaultValues("critical")) outputArray.push(new asn1js.Boolean({
      value: this.critical
    }));
    outputArray.push(this.extnValue); //endregion
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
    const object = {
      extnID: this.extnID,
      extnValue: this.extnValue.toJSON()
    };
    if (this.critical !== Extension.defaultValues("critical")) object.critical = this.critical;

    if ("parsedValue" in this) {
      if ("toJSON" in this.parsedValue) object.parsedValue = this.parsedValue.toJSON();
    }

    return object;
  } //**********************************************************************************


} //**************************************************************************************


exports.default = Extension;
//# sourceMappingURL=Extension.js.map