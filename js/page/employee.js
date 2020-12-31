$(document).ready(function () {
    loadData();
})
/**
 * Load dữ liệu
 * CreateBy: PVQuynh(31/12/2020)
 * */
function loadData() {
    $.ajax({
        //lấy dữ liệu về
        url: "http://api.manhnv.net/api/employees",
        method: "GET",
    }
    ).done(function (res) {
        var data = res;
        $.each(data, function (index, item) {
            var dateOfBirth = item.DateOfBirth;
            dateOfBirth = formatDate(dateOfBirth);
            //hiển thị dạng ngày/tháng/năm
            var salary = item.Salary;
            salary = formatSalary(salary);
            //hiển thị dạng tiền tệ
            var check = `<input type="checkbox"/>`;
            if (item.Gender > 0) {
                var check = `<input type="checkbox" checked/>`;
            }//tạo ô check box để thay thế hiển thị nam/nữ
            var tr = $(`<tr>
                            <td>`+item.EmployeeCode+`</td>
                            <td>`+ item.FullName +`</td>
                            <td><div style="text-align:center">`+check+`</div></td>
                            <td>`+ dateOfBirth +`</td>
                            <td></td>
                            <td>`+ item.PhoneNumber +`</td>
                            <td>`+ item.Email +`</td>
                            <td><div style="max-width:100px" title="`+ item.Address + `"><span style="width:80px">` + item.Address + `</span></div></td>
                            <td><div style="text-align:right">`+ salary +`</div></td>
                            <td>`+ item.EmployeeCode +`</td>
                        </tr>`);
            $(`table tbody`).append(tr);
            debugger;
        })
    }).fail(function (res) {

    })
}
//binding dữ liệu lên table
/**
 * chuyển đổi dữ liệu ngày tháng sang ngày/tháng/năm
 * @param {Date} date bất cứ kiểu dữ liệu nào
 * Createdby : PVQuynh(31/12/2020) 
 */
function formatDate(date) {
    var date = new Date(date);
    if (Number.isNaN(date.getTime())) {
        return "";
    } else {
        var day = date.getDate();
        month = date.getMonth() + 1;
        year = date.getFullYear();
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        return day + '/' + month + '/'+year;
    }
}
function formatString(s) {
    if (s == null) {
        return "";
    }
    else {
        return s;
    }
}
/**{}
 * Hàm định dạng tiền tệ
 * @param {Number} money số tiền
 */
    function formatSalary(money) {
        var money = formatString(money);
        money = money.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND'
        });
        return money;
}
