function solvequadratic() {
    let a = parseFloat(document.getElementById('a').value);
    let b = parseFloat(document.getElementById('b').value);
    let c = parseFloat(document.getElementById('c').value);

    let delta = b * b - 4 * a * c;

    if (delta > 0) {
        let x1 = (-b + Math.sqrt(delta)) / (2 * a);
        let x2 = (-b - Math.sqrt(delta)) / (2 * a);
        document.getElementById('result').innerHTML = "Nghiệm của phương trình là: x<sub>1</sub> = " + x1 + ", x<sub>2</sub> = " + x2;
    } else if (delta === 0) {
        let x = -b / (2 * a);
        document.getElementById('result').innerHTML = "Nghiệm kép của phương trình là: x<sub>1</sub> = x<sub>2</sub> = " + x;
    } else {
        document.getElementById('result').innerHTML = "Phương trình không có nghiệm thực.";
    }
}

function findnextDay()
{
    let dd = parseFloat(document.getElementById('dd').value);
    let mm = parseFloat(document.getElementById('mm').value);
    let yyyy = parseFloat(document.getElementById('yyyy').value);
    if ( (mm == 1 || mm == 3 || mm == 5 || mm == 7 || mm == 8 || mm == 10 || mm == 12) && (dd >= 1 && dd <= 31))
    {
        dd = dd + 1;
        if (dd <= 31)
            document.getElementById('solve').innerHTML = "Ngày tiếp theo là " + dd + "/" + mm + "/" + yyyy;
        else
        {
            dd = 1;
            mm = mm + 1;
            if (mm <= 12)
                document.getElementById('solve').innerHTML = "Ngày tiếp theo là " + dd + "/" + mm + "/" + yyyy;
            else
            {
                mm = 1;
                yyyy = yyyy + 1;
                document.getElementById('solve').innerHTML = "Ngày tiếp theo là " + dd + "/" + mm + "/" + yyyy;

            }
        }
    }
    else if ( (mm == 4 || mm == 6 || mm == 9 || mm == 11) &&  (dd >= 1 && dd <= 30))
    {
        dd = dd + 1;
        if (dd <= 30)
            document.getElementById('solve').innerHTML = "Ngày tiếp theo là " + dd + "/" + mm + "/" + yyyy;
        else
        {
            dd = 1;
            mm = mm + 1;
            document.getElementById('solve').innerHTML = "Ngày tiếp theo là " + dd + "/" + mm + "/" + yyyy;
        }
    }
    else if (mm == 2 && yyyy % 4 == 0 && dd >= 1 && dd <= 29)
    {
        dd = dd + 1;
        if (dd <= 29)
            document.getElementById('solve').innerHTML = "Ngày tiếp theo là " + dd + "/" + mm + "/" + yyyy;
        else
        {
            dd = 1;
            mm = mm + 1;
            document.getElementById('solve').innerHTML = "Ngày tiếp theo là " + dd + "/" + mm + "/" + yyyy;
        }
    }
    else if (mm == 2 && yyyy % 4 != 0 && dd >= 1 && dd <= 28)
    {
        dd = dd + 1;
        if (dd <= 28)
            document.getElementById('solve').innerHTML = "Ngày tiếp theo là " + dd + "/" + mm + "/" + yyyy;
        else
        {
            dd = 1;
            mm = mm + 1;
            document.getElementById('solve').innerHTML = "Ngày tiếp theo là " + dd + "/" + mm + "/" + yyyy;
        }
    }
    else
    {
        document.getElementById('solve').innerHTML = "Nhập sai định dạng, vui lòng nhập lại!";
    }
}