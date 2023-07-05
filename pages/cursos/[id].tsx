import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Alumno } from "../entities/alumno.entity";
import { environment } from "../../enviroments/enviroment";
import { useRouter } from "next/router";
import { colorTable } from "../styles/iacc-theme";
import { alumnosTableStructure } from "../structure/alumno-table";
import { Button, ConfigProvider, Space, Table, theme } from "antd";


export const getServerSideProps: GetServerSideProps<{ alumnos: Alumno[] }> = async ({params}: any) => {
  try {
    const res = await fetch(`${environment.BASE_URL}/cursos/${params.id}/alumnos`)
    const response = await res.json()
    return { props: {alumnos: response} }
  } catch (error) {
    console.log(error, 'error');
    return { props: {alumnos: [] }}
  }
}

export default function Curso({ alumnos }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();
    return (
      <div>
        <h1>ID Curso: {router.query.id}</h1>
        <div>
          <ConfigProvider theme={colorTable}>
            <Table
              dataSource={alumnos} 
              columns={alumnosTableStructure} 
              onRow={(data, _) => ({
                onClick: (e) => console.log({data})
              })}
              rowKey={(record) => record.id}
            />
            <Space direction="horizontal" style={{width: '100%',justifyContent: 'center'}}>
              <Button type="primary" onClick={() => router.push(`/cursos`)}>Volver</Button>
            </Space>
          </ConfigProvider>
        </div>
      </div>
    )
}

