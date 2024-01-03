import {useSearchParams} from "react-router-dom";
import {Input, Col, Row, Button} from 'antd';
import './index.css'
import {useState} from "react";

function Form() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [geohashInput, setGeohashInput] = useState<boolean>(true);

    const handleSubmit = (geohash: string) => {
        setSearchParams({geohash: geohash});
    };


    return (
        <>
            {geohashInput ?
                <div className={"center-bottom"}>
                    <Input
                        type="text"
                        value={searchParams.get("geohash") || ""}
                        onChange={(e) => {
                            handleSubmit(e.target.value)
                        }}
                        placeholder="Enter a geohash"
                        style={{width: "20%"}}
                    />
                </div> :
                <Row className={"center-coordinates"}>
                <Col span={24}>
                    <Row justify="center">
                        <Input
                            type="text"
                            placeholder="north"
                            style={{width: "15%"}}
                        />
                    </Row>

                    <Row justify="space-evenly">
                        <Input
                            type="text"
                            placeholder="west"
                            style={{width: "15%"}}
                        />
                        <Input
                            type="text"
                            placeholder="east"
                            style={{width: "15%"}}
                        />
                    </Row>

                    <Row justify="center">
                        <Input
                            type="text"
                            placeholder="south"
                            style={{width: "15%"}}
                        />
                    </Row>
                </Col>
                </Row>
            }
            <div className={"center-bottom-small"}>
                <Button
                    onClick={() => {
                        setGeohashInput(!geohashInput)
                    }}
                    type="default"
                    style={{width: "15%"}}
                >
                    {geohashInput ? "Coordinates" : "Geohash"}
                </Button>
            </div>

        </>
    );
}

export default Form;