import React, { useState } from "react";
import { Card, Avatar, Modal, Button, DatePicker, Table, Row } from "antd";
import "./CustomCard.css";

//import members for mock members
import members from "../../constant/member";

const { Column } = Table;
const { Meta } = Card;

const CustomCard = () => {
    //Open close modal
    const [visible, setVisible] = useState(false);

    //Selects member whose activity to be shown
    const [activity, setActivity] = useState([]);

    //Close modal
    const handleOk = () => {
        console.log("ok");
        setVisible(false);
    };

    //Select user
    const clickHandler = (ind) => {
        setActivity(members[ind].activity_periods);
        setVisible(true);
    };

    //Filter activity based on date
    const dateHandler = (data, dateString) => {
        // console.log(dateString, data);
        const newActivity = activity.filter((elem) => {
            const d = new Date(elem.start_time.slice(0, 11));
            const date = d.getDate();
            const month = d.getMonth() + 1;
            const year = d.getFullYear();

            //format date for comparison
            const formattedDate = `${year}-${
                month <= 9 ? `0${month}` : month
            }-${date <= 9 ? `0${date}` : date}`;
            // console.log(formattedDate, elem.start_time, dateString);
            return formattedDate === dateString;
        });

        //set activity for the given date
        setActivity(newActivity);
        // console.log(newActivity);
    };

    return (
        <div>
            <Row className="container">
                {members.map((member, index) => {
                    return (
                        <Card
                            style={{ width: 300, marginTop: 16 }}
                            className="card"
                            onClick={() => clickHandler(index)}
                            key={member.id}
                        >
                            <Meta
                                avatar={
                                    <Avatar
                                        size="large"
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    />
                                }
                                title={member.real_name}
                                description={member.tz}
                            />
                        </Card>
                    );
                })}
            </Row>

            <Modal
                // title="Basic Modal"

                visible={visible}
                onCancel={handleOk}
                footer={[
                    <Button key="submit" type="primary" onClick={handleOk}>
                        Ok
                    </Button>,
                ]}
            >
                <DatePicker onChange={dateHandler} />
                <Table dataSource={activity}>
                    <Column title="From" dataIndex="start_time" key="Start" />
                    <Column title="To" dataIndex="end_time" key="End" />
                </Table>
            </Modal>
        </div>
    );
};
export default CustomCard;
