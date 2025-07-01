

function Vector(x, y) {
    return {
        x: x,
        y: y,

        Length() {
            return Math.sqrt(this.x * this.x + this.y * this.y)
        },
        AddVector(other) {
            this.x += other.x;
            this.y += other.y;
        },
        Add(x, y) {
            this.x += x;
            this.y += y;
        },
        SubVector(other) {
            this.x -= other.x;
            this.y -= other.y;
        },
        Sub(x, y) {
            this.x -= x;
            this.y -= y;
        },
        Normalize() {
            let length = this.Length();
            if (length == 0)
                return Vector(0, 0);
            this.x /= length;
            this.y /= length;
        },
        Multiply(number) {
            this.x *= number;
            this.y *= number;
        },
        Copy() {
            return Vector(this.x, this.y);
        },
        RotateByRadians(radians) {
            let xd = this.x * Math.cos(radians) - this.y * Math.sin(radians);
            let yd = this.x * Math.sin(radians) + this.y * Math.cos(radians);
            this.x = xd;
            this.y = yd;
        },
        RotateByAngle(angle) {
            angle = angle % 360;
            this.RotateByRadians(angle / 180 * Math.PI);
        },
        GetVectorTo(other) {
            let tmp = other.Copy();
            tmp.SubVector(this);
            return tmp;
        },
        GetDirectionTo(other) {
            let rep = this.GetVectorTo(other);
            rep.Normalize();
            return rep;
        },
        GetDistance(other) {
            let tmp = this.GetVectorTo(other);
            return tmp.Length();
        }
    }
}

function GetVectorByRadians(radians) {
    return Vector(-Math.cos(radians), Math.sin(radians));
}

function GetVectorByAngle(angle) {
    let radians = (angle % 360) / 180 * Math.PI;
    return GetVectorByRadians(radians);
}

