import React, { Component } from 'react';
import axios from "axios";

class floatingPopulationList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            responseFPList: '',
            append_FPList: '',
        }
    }

    componentDidMount() {
        this.callFloatPopulListApi()
    }

    callFloatPopulListApi = async () => {
            alert("/api/dept 클릭...")
            axios.get('http://192.168.1.12:8080/api/dept', {
            })
            .then( response => {
                //alert( JSON.stringify(response) );
                try {
                    this.setState({ responseFPList: response });
                    this.setState({ append_FPList: this.FloatPopulListAppend() });
                } catch (error) {
                    alert(error)
                }
            })
            .catch( error => {alert(error);return false;} );
    }

    FloatPopulListAppend = () => {
        let result = []
        var FPList = this.state.responseFPList.data
        var jsonString = JSON.stringify(FPList)
        //jsonString = jsonString.replace(/\(1시간단위\)/g, '')
        //jsonString = jsonString.replace(/\(10세단위\)/g, '')
        var json = JSON.parse(jsonString)

        for(let i=0; i<json.deptList.length; i++){
            var data = json.deptList[i]
            var idx = i+1
            result.push(
            <tr class="hidden_type">
            <td>{idx}</td>
            <td>{data.deptno}</td>
            <td>{data.dname}</td>
            <td>{data.loc}</td>
            </tr>
            )
        }
        return result
    }

    render () {
        return (
            <section class="sub_wrap" >
                <article class="s_cnt mp_pro_li ct1 mp_pro_li_admin">
                    <div class="li_top">
                        <h2 class="s_tit1">oracle-xe-11g-SCOTT</h2>
                    </div>
                    <div class="list_cont list_cont_admin">
                        <table class="table_ty1 fp_tlist">
                            <tr>
                                <th>Row</th>
                                <th>deptno</th>
                                <th>dname</th>
                                <th>loc</th>
                            </tr>
                        </table>	
                        <table class="table_ty2 fp_tlist">
                            {this.state.append_FPList}
                        </table>
                    </div>
                </article>
            </section>
        );
    }
}

export default floatingPopulationList;