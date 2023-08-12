const jq = $.noConflict();

jq(document).ready(function () {
    let localStorageKey = "userData";
    let getData = localStorage.getItem(localStorageKey);
    if (getData !== null) {
        var employeeData = JSON.parse(getData);
    } else {
        var employeeData = [];
    }

    //show data on table
    let showdataonpage = function(){
        jq('.allData').html("");
        jq(employeeData).each(function(e){
            jq('.allData').append(`
                        <tr>
                            <th scope="row">${e + 1}</th>
                            <td><img src=${employeeData[e]['profileimg']} class="profileimg-table" alt="profile_img"></td>
                            <td>${employeeData[e]['id']}</td>
                            <td>${employeeData[e]['fname']}</td>
                            <td>${employeeData[e]['lname']}</td>
                            <td>${employeeData[e]['email']}</td>
                            <td>${employeeData[e]['ocode']}</td>
                            <td>${employeeData[e]['jobtitle']}</td>
                            <td>
                            <button class="btn btn-info editbtn" type="button" data-bs-toggle="modal" data-bs-target="#updatemodal">
                                <span><i class="fa-solid fa-eye"></i></span>
                            </button>
                            </td>
                            <td>
                            <button class="btn btn-orange delbtn" type="button">
                                <span><i class="fa-solid fa-trash"></i></span>
                            </button>
                            </td>
                        </tr>
            `);
        });
    }
    showdataonpage();

    // add empolyee data button
    jq('#addbtn').on('click', function(){
        employeeData.push({
            id: jq("#Id").val(),
            fname: jq("#Fname").val(),
            lname: jq("#Lname").val(),
            email: jq("#Email").val(),
            ocode: jq("#OCode").val(),
            jobtitle: jq("#JobTitle").val(),
            profileimg: jq(".profile-img").attr('src'),
        });
        jq("#adddetailsform")[0].reset();
        let storeData = JSON.stringify(employeeData);
        localStorage.setItem(localStorageKey, storeData);
        showdataonpage();
    });

    jq('.custom-file-upload').on('click', function () {
        jq('#profileImageInput').click();
    });

    jq('#profileImageInput').on('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                jq('#profileImage').attr('src', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // edit button
    jq('.editbtn').each(function(e){
        jq(this).on('click',function(){
            jq('#updateId').val(employeeData[e]['id']);
            jq('#updateFname').val(employeeData[e]['fname']);
            jq('#updateLname').val(employeeData[e]['lname']);
            jq('#updateEmail').val(employeeData[e]['email']);
            jq('#updateOCode').val(employeeData[e]['ocode']);
            jq('#updateJobTitle').val(employeeData[e]['jobtitle']);
            jq('.update-profile-img').attr('src',employeeData[e]['profileimg']);

            jq('#updatebtn').on('click',function(){
                employeeData[e]['id'] = jq('#updateId').val();
                employeeData[e]['fname'] = jq('#updateFname').val();
                employeeData[e]['lname'] = jq('#updateLname').val();
                employeeData[e]['email'] = jq('#updateEmail').val();
                employeeData[e]['ocode'] = jq('#updateOCode').val();
                employeeData[e]['jobtitle'] = jq('#updateJobTitle').val();
                employeeData[e]['profileimg'] = jq('.update-profile-img').attr('src');

                let updateData = JSON.stringify(employeeData);
                localStorage.setItem(localStorageKey,updateData);
                showdataonpage();
            });
        });
    });


    // del btn
    jq(document).on('click', '.delbtn', function () {
        const dataIndex = jq(this).closest('tr').index();
        employeeData.splice(dataIndex, 1);
        const deleteData = JSON.stringify(employeeData);
        localStorage.setItem(localStorageKey, deleteData);
        showdataonpage();
    });


    // search work
    jq('#searchbtn').on('click', function (e) {
        e.preventDefault();
        const searchText = jq('#search').val().toLowerCase();
        const filteredData = employeeData.filter(item => {
            return (
                item.fname.toLowerCase().includes(searchText) ||
                item.lname.toLowerCase().includes(searchText) ||
                item.email.toLowerCase().includes(searchText) ||
                item.ocode.toLowerCase().includes(searchText) ||
                item.jobtitle.toLowerCase().includes(searchText)
            );
        });
        showFilteredData(filteredData);
    });

    function showFilteredData(filteredData) {
        jq('.allData').html('');
        filteredData.forEach(function (item, index) {
            jq('.allData').append(`
                <tr>
                    <th scope="row">${index + 1}</th>
                    <td><img src=${item.profileimg} class="profileimg-table" alt="profile_img"></td>
                    <td>${item.id}</td>
                    <td>${item.fname}</td>
                    <td>${item.lname}</td>
                    <td>${item.email}</td>
                    <td>${item.ocode}</td>
                    <td>${item.jobtitle}</td>
                    <td>
                        <button class="btn btn-info editbtn" type="button" data-bs-toggle="modal" data-bs-target="#updatemodal">
                            <span><i class="fa-solid fa-eye"></i></span>
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-orange delbtn" type="button">
                            <span><i class="fa-solid fa-trash"></i></span>
                        </button>
                    </td>
                </tr>
            `);
        });
    }


});