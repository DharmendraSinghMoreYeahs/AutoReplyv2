
class RegexCollection {

    static convertToMobileNumber = (mobileNum) => {
        if (mobileNum.length != 10) {
            return mobileNum;
        }
        let arr = mobileNum.split('') ?? [];
        arr.unshift('(');
        arr.splice(4,0, ')');
        arr.splice(5,0, ' ');
        arr.splice(9,0, '-');
        return arr.join('');
    }
    static phoneNumberRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    static MobileNumberFormat = /^((?:\+27|27)|0)(\d{2})-?(\d{3})-?(\d{4})$/;
    static EmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    static DateFormat = 'mm/dd/yyyy';
    static DateTimeFormat = 'MM/DD/yyyy HH:mm:ss';
    static TimeFormat = 'HH:mm';
    static PartyTimeFormat = 'MMM. DD, HH:mmA';
    static HostPartyTimeFormat = 'ddd. MMMM DD, HH:mm A';
    static PartyInviteFormat = 'ddd. MMMM DD, hh:mm A';
    //Validation Regex
    static requiredString = /^(\S+)$/;
    static stringNumber = /^[0-9]*$/;
    // 
    static FileRegex = /((content|file):\/)?\/.*/;
    static FileName = /^.*[\\\/]/;
    static FileExtension = /(?:\.([^.]+))?$/;
}   

export default RegexCollection;